# views.py

from django.http import HttpResponse
import requests


def get_image_from_url(request):
    if request.method == 'GET':
        image_url = request.GET.get('image_url')
        if image_url:
            try:
                image_response = requests.get(image_url)
                if image_response.status_code == 200:
                    image_content = image_response.content
                    return HttpResponse(image_content, content_type='image/jpeg')
                else:
                    return HttpResponse('Failed to fetch image', status=400)
            except requests.RequestException:
                return HttpResponse('Error fetching image', status=500)
    return HttpResponse('Invalid request method', status=405)
