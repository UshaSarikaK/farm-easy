from django.urls import path
from django.conf import settings
from . import views
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index , name = 'index'),
    path('farmer', views.farmer , name = 'farmer'),
    path('tourist', views.tourist , name = 'tourist'),
    path('farmer/pred', views.farmer_pred , name = 'farmer_pred'),
    path('translate/', views.translate_text_view, name='translate_text'),
    path('tourist/centres', views.tourist_centres , name = 'tourist_centres'),
    path('farmer/fin', views.micro_fin , name = 'micro_fin'),
    path('farmer/sell', views.farmer_sell , name = 'farmer_sell'),
    path('farmer/market', views.farmer_buy , name = 'farmer_buy'),
    path('tourist/garden', views.garden , name = 'garden'),
    path('farmer/resource', views.knowledge , name = 'knowledge'),
    path('tourist/market', views.tourist_buy , name = 'tourist_buy'),
    path('tourist/book', views.tourist_book , name = 'tourist_book'),
    path('farmer/schemes', views.farmer_scheme , name = 'farmer_scheme'),
    path('farmer/dispred', views.dis_pred , name = 'dis_pred'),
    path('farmer/chatbot', views.chatbot , name='chatbot'),
]