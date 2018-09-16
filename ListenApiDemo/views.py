from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from secrets import MASHAPE_KEY
import requests

# Filters: "sort by date / relevance" and "search episodes / podcasts".

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
    return JsonResponse(response.json())
