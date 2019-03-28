import os
import requests

from django import http
from django.core.cache import cache
from django.views.decorators.http import require_http_methods


LISTEN_API_KEY = os.environ.get('LISTEN_API_KEY', '')
BASE_URL = 'https://listen-api.listennotes.com/api/v2'


@require_http_methods(['GET'])
def search(request):
    query = request.GET.get('q')
    sort_by_date = request.GET.get('sort_by_date')
    result_type = request.GET.get('type')
    offset = request.GET.get('offset', '0')

    if cache.get('quota_exceeded', False):
        # Listen API won't bill HEAD requests. You can use HEAD requests to check API usage.
        head_response = requests.head(
            '%s/search' % BASE_URL,
            headers={
                'X-ListenAPI-Key': LISTEN_API_KEY,
                'Accept': 'application/json',
            })

        if int(head_response.headers['X-ListenAPI-Usage']) > int(head_response.headers['X-ListenAPI-FreeQuota']):
            return http.HttpResponse(status=429)
        else:
            cache.set('quota_exceeded', False)

    response = requests.get(
        '{}/search?q={}&sort_by_date={}&type={}&offset={}'.format(BASE_URL, query, sort_by_date, result_type, offset),
        headers={
            'X-ListenAPI-Key': LISTEN_API_KEY,
            'Accept': 'application/json'
        })

    if int(response.headers['X-ListenAPI-Usage']) > int(response.headers['X-ListenAPI-FreeQuota']):
        cache.set('quota_exceeded', True)

    return http.JsonResponse(response.json())
