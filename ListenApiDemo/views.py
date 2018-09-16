from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from secrets import MASHAPE_KEY
import requests

@require_http_methods(["GET"])
def search(request):
    query = request.GET.get("q")
    sort_by_date = request.GET.get("sort_by_date")
    result_type = request.GET.get("type")
    response = requests.get("https://listennotes.p.mashape.com/api/v1/search?q={}&sort_by_date={}&type={}".format(query, sort_by_date, result_type),
      headers={
        "X-Mashape-Key": MASHAPE_KEY,
        "Accept": "application/json"
      }
    )
    if response.headers['X-Ratelimit-full-text-search-quota-Remaining'] == 0:
        return HttpResponse(status=429)
    return JsonResponse(response.json())
