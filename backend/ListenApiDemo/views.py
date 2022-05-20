import os

from django import http
from django.views.decorators.http import require_http_methods

from listennotes import podcast_api, errors


LISTEN_API_KEY = os.environ.get('LISTEN_API_KEY')


@require_http_methods(['GET'])
def search(request):
    q = request.GET.get('q')
    sort_by_date = request.GET.get('sort_by_date')
    result_type = request.GET.get('type')
    offset = request.GET.get('offset', '0')

    try:
        # If api_key is None, then we'll connect to api mock servers which return fake data
        client = podcast_api.Client(api_key=LISTEN_API_KEY)
        response = client.search(
            q=q, sort_by_date=sort_by_date, type=result_type, offset=offset)
    except errors.APIConnectionError:
        return http.JsonResponse({}, status=503)
    except errors.AuthenticationError:
        return http.JsonResponse({}, status=401)
    except errors.InvalidRequestError:
        return http.JsonResponse({}, status=400)
    except errors.NotFoundError:
        return http.JsonResponse({}, status=404)
    except errors.RateLimitError:
        return http.JsonResponse({}, status=429)
    except errors.ListenApiError:
        return http.JsonResponse({}, status=500)
    else:
        return http.JsonResponse(response.json())
