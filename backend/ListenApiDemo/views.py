from django.http import JsonResponse, HttpResponse
from django.core.cache import cache
from django.views.decorators.http import require_http_methods
import os
import requests

RAPID_API_KEY = os.environ.get('RAPID_API_KEY', '')


@require_http_methods(['GET'])
def search(request):
    query = request.GET.get('q')
    sort_by_date = request.GET.get('sort_by_date')
    result_type = request.GET.get('type')
    offset = request.GET.get('offset', '0')

    if cache.get('quota_exceeded', False):
        head_response = requests.head(
                'https://api.listennotes.com/api/v1/search',
                headers={
                    'X-RapidAPI-Key': RAPID_API_KEY,
                    'Accept': 'application/json'
                    }
                )
        if 'X-Ratelimit-full-text-search-quota-Remaining' in head_response.headers and head_response.headers['X-Ratelimit-full-text-search-quota-Remaining'] == 0:
            return HttpResponse(status=429)
        else:
            cache.set('quota_exceeded', False)

    response = requests.get('https://listennotes.p.mashape.com/api/v1/search?q={}&sort_by_date={}&type={}&offset={}'.format(query, sort_by_date, result_type, offset),
                            headers={
                                'X-RapidAPI-Key': RAPID_API_KEY,
                                'Accept': 'application/json'
                                }
                            )
    if 'X-Ratelimit-full-text-search-quota-Remaining' in response.headers and response.headers['X-Ratelimit-full-text-search-quota-Remaining'] == 0:
        cache.set('quota_exceeded', True)
    return JsonResponse(response.json())
