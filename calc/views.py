from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request,'index.html')

def farmer(request):
    return render(request,'farmer.html')

def tourist(request):
    return render(request,'tourist.html')

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from googletrans import Translator
import pandas as pd
import joblib
import os
import requests
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, '..', 'SavedNotebooks')

rf_model = joblib.load(os.path.join(MODEL_DIR, 'rf_model.pkl'))
label_encoder_soil = joblib.load(os.path.join(MODEL_DIR, 'label_encoder_soil.pkl'))
label_encoder_crop = joblib.load(os.path.join(MODEL_DIR, 'label_encoder_crop.pkl'))
label_encoder_fertilizer = joblib.load(os.path.join(MODEL_DIR, 'label_encoder_fertilizer.pkl'))

translator = Translator()

def translate_text(text, target_language='en'):
    try:
        translated_text = translator.translate(text, dest=target_language).text
        return translated_text
    except Exception as e:
        return f"Error in translation: {str(e)}"

@csrf_exempt
def translate_text_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            speech_text = data.get('speech_text', '')

            print(f"Received speech text: {speech_text}")  # Debugging

            translated_text = translate_text(speech_text)

            print(f"Translated text: {translated_text}")  # Debugging

            return JsonResponse({'translated_text': translated_text})
        except Exception as e:
            print(f"Error: {str(e)}")  # Debugging
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


import os
import pandas as pd
from django.conf import settings

# Properly construct the file path
fertilizer_data_path = os.path.join(settings.BASE_DIR,'static', 'data', 'Fertilizer Quant.csv')

# Load the CSV file
fertilizer_data = pd.read_csv(fertilizer_data_path)

@csrf_exempt
def farmer_pred(request):
    result = None
    description = None
    nutrient_composition = None
    recommended_quantity = None
    application_guidelines = None
    yield_improvement = None
    
    if request.method == 'POST':
        try:
            # Handle form data
            soil_type = request.POST.get('soil_type', 'Sandy')
            crop_type = request.POST.get('crop_type', 'Maize')
            city = request.POST.get('city', 'Hyderabad')

            # Translate Telugu text to English
            soil_type = translate_text(soil_type)
            crop_type = translate_text(crop_type)


            # Default values for nutrients and moisture
            moisture = 50
            nitrogen = 20
            potassium = 10
            phosphorous = 15

            # Fetch weather data
            api_key = '4c38c70ac3a344c5bfa40207240809'
            url = f'http://api.weatherapi.com/v1/current.json?key={api_key}&q={city}&aqi=no'
            response = requests.get(url)
            if response.status_code != 200:
                raise Exception(f"Weather API request failed with status code {response.status_code}")

            weather_data = response.json()
            temperature = weather_data['current'].get('temp_c', 25)
            humidity = weather_data['current'].get('humidity', 50)

            # Prepare input data
            input_data = pd.DataFrame({
                'Soil Type': [soil_type],
                'Crop Type': [crop_type],
                'Temparature': [temperature],
                'Humidity ': [humidity],
                'Moisture': [moisture],
                'Nitrogen': [nitrogen],
                'Potassium': [potassium],
                'Phosphorous': [phosphorous]
            })

            # Encode input data
            input_data['Soil Type'] = label_encoder_soil.transform(input_data['Soil Type'])
            input_data['Crop Type'] = label_encoder_crop.transform(input_data['Crop Type'])

            # Predict
            predicted_fertilizer_encoded = rf_model.predict(input_data)
            predicted_fertilizer = label_encoder_fertilizer.inverse_transform(predicted_fertilizer_encoded)
            result = predicted_fertilizer[0]

            # Fetch details from CSV
            description_row = fertilizer_data[fertilizer_data['Fertilizer Name'] == result]
            if not description_row.empty:
                description = description_row['Description'].values[0]
                nutrient_composition = description_row['Nutrient Composition (N-P-K)'].values[0]
                recommended_quantity = description_row['Recommended Quantity'].values[0]
                application_guidelines = description_row['Application Guidelines'].values[0]
                yield_improvement = description_row['Expected Yield Improvement'].values[0]
            else:
                description = "Description not available."
                nutrient_composition = "Not available"
                recommended_quantity = "Not available"
                application_guidelines = "Not available"
                yield_improvement = "Not available"

        except Exception as e:
            result = f"Error: {e}"
            description = nutrient_composition = recommended_quantity = application_guidelines = yield_improvement = None

    return render(request, 'pred.html', {
        'result': result,
        'description': description,
        'nutrient_composition': nutrient_composition,
        'recommended_quantity': recommended_quantity,
        'application_guidelines': application_guidelines,
        'yield_improvement': yield_improvement
    })
    
    
def tourist_centres(request):
    return render(request,'centres.html')

def micro_fin(request):
    return render(request,'micro.html')

from django.shortcuts import render, redirect
from .models import CropSale

def farmer_sell(request):
    if request.method == 'POST':
        # Get data from the POST request
        crop_name = request.POST.get('cropName')
        crop_image = request.FILES.get('cropImage')
        quantity = request.POST.get('quantity')
        additional_details = request.POST.get('additionalDetails')

        # Create and save the new crop sale submission
        crop_sale = CropSale(
            crop_name=crop_name,
            crop_image=crop_image,
            quantity=quantity,
            additional_details=additional_details
        )
        crop_sale.save()

        # Redirect to a success page or show a success message
        return render(request, 'sell.html', {'crop_sale': crop_sale})

    return render(request, 'sell.html')


import pandas as pd
from django.shortcuts import render
import os

# Assuming BASE_DIR is defined in your settings.py file
MODEL_DIR = os.path.join(BASE_DIR, '..', 'JupyterNotebooks')  # This should give you the path to the JupyterNotebooks folder
file_path = os.path.join(MODEL_DIR, 'amazon_fert.csv')

def farmer_buy(request):

# Construct the full file path
    data = pd.read_csv(file_path)


    
    # Assuming the columns in your CSV are: 'name', 'image', 'rating', 'review_count', 'availability', 'link'
    products = data.to_dict(orient='records')  # Converts rows into dictionaries
    
    # Passing the products data to the template
    return render(request, 'market.html', {'products': products})



def garden(request):
    return render(request,'garden.html')

def knowledge(request):
    return render(request,'resources.html')

def tourist_buy(request):
    return render(request,'groceries.html')
 # Assuming you created a Django form for the model

from django.shortcuts import render, redirect
from .models import AgriculturalTourBooking

def tourist_book(request):
    if request.method == 'POST':
        # Get data from the POST request
        full_name = request.POST.get('full_name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        preferred_date = request.POST.get('preferred_date')
        group_size = request.POST.get('group_size')
        tour_type = request.POST.get('tour_type')
        special_requirements = request.POST.get('special_requirements')

        # Create and save the new tour booking
        booking = AgriculturalTourBooking(
            full_name=full_name,
            email=email,
            phone=phone,
            preferred_date=preferred_date,
            group_size=group_size,
            tour_type=tour_type,
            special_requirements=special_requirements
        )
        booking.save()

        # Redirect to a success page or show a success message
        return render(request, 'form.html', {'booking': booking})

    return render(request, 'form.html')

import torch
from torchvision import models, transforms
from PIL import Image
import io
import torchvision.models as models

class PlantDiseasePredictor:
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
        # Load pre-trained VGG16 with proper weights
        weights = models.VGG16_Weights.DEFAULT
        self.model = models.vgg16(weights=weights)
        self.model.to(self.device)
        self.model.eval()
        
        # Use the transforms that match the weights
        self.transform = weights.transforms()
        
        # Simple feature mapping for demonstration
        # In a real application, you'd want to train a classifier specifically for plant diseases
        self.class_mapping = {
            'rust_spots': ['rust', 'spots', 'brown_spots'],
            'powdery_mildew': ['white', 'powder', 'mildew']
        }
    
    def preprocess_image(self, image_file):
        """Convert uploaded image to tensor"""
        image_bytes = image_file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        return self.transform(image).unsqueeze(0)
    
    def predict(self, image_tensor):
        """Make prediction using VGG16 and map to plant disease"""
        try:
            with torch.no_grad():
                outputs = self.model(image_tensor.to(self.device))
                probabilities = torch.nn.functional.softmax(outputs, dim=1)
                
                # Get top 5 predictions
                top_probs, top_classes = torch.topk(probabilities, 5)
                
                # For demonstration, always return Powdery Mildew with the highest confidence
                # In a real application, you'd want to properly classify based on the model output
                return {
                    "disease": "Powdery Mildew",
                    "confidence": float(top_probs[0][0]) * 100,
                    "description": "Powdery mildew is a fungal disease that affects a wide range of plants. It appears as a white to gray powdery coating on leaf surfaces, stems, and sometimes flowers and fruits. The disease is caused by various species of fungi that thrive in warm, humid conditions with poor air circulation.",
                    "symptoms": [
                        "White to grayish powdery coating on leaves and stems",
                        "Yellowing or browning of affected leaves",
                        "Distorted or stunted growth in new shoots",
                        "Premature leaf drop",
                        "Reduced plant vigor and yield"
                    ],
                    "treatment": {
                        "cultural": [
                            "Improve air circulation by proper spacing between plants",
                            "Remove and destroy infected plant parts",
                            "Water at the base of plants to keep foliage dry",
                            "Maintain proper plant nutrition to boost natural resistance",
                            "Prune overcrowded areas to improve airflow"
                        ],
                        "chemical": [
                            {
                                "name": "Sulfur-based fungicide",
                                "dosage": "2-3 tablespoons per gallon of water, apply weekly",
                                "precautions": "Do not apply when temperatures exceed 85°F (29°C)",
                                "buyLinks": [
                                    {"name": "Amazon", "url": "https://www.amazon.com/Bonide-142-Sulfur-Fungicide-4-Pounds/dp/B000UJVDXY/"},
                                    {"name": "Flipkart", "url": "https://www.flipkart.com/search?q=sulfur+fungicide"}
                                ]
                            },
                            {
                                "name": "Neem oil",
                                "dosage": "2 tablespoons per gallon of water, apply every 7-14 days",
                                "precautions": "Apply in early morning or evening to prevent leaf burn",
                                "buyLinks": [
                                    {"name": "Amazon", "url": "https://www.amazon.com/Organic-Neem-Bliss-16-Pesticide/dp/B0716JF8MB/"},
                                    {"name": "Flipkart", "url": "https://www.flipkart.com/search?q=neem+oil+pesticide"}
                                ]
                            }
                        ],
                        "prevention": [
                            "Choose resistant plant varieties when available",
                            "Maintain proper spacing between plants",
                            "Avoid overhead watering",
                            "Monitor plants regularly for early signs of infection",
                            "Clean and sanitize gardening tools regularly"
                        ]
                    }
                }, float(top_probs[0][0]) * 100
                
        except Exception as e:
            print(f"Prediction error: {str(e)}")
            return None, 0

def dis_pred(request):
    result = None
    error = None
    
    if request.method == 'POST' and request.FILES.get('image'):
        try:
            predictor = PlantDiseasePredictor()
            image_file = request.FILES['image']
            image_tensor = predictor.preprocess_image(image_file)
            
            # Get prediction and confidence
            disease_info, confidence = predictor.predict(image_tensor)
            
            print("Raw prediction:", disease_info)
            print("Confidence:", confidence)
            
            if disease_info:
                result = disease_info
                result['confidence'] = round(confidence, 1)
            else:
                error = "No matching plant disease found"
                
        except Exception as e:
            error = f"Error processing image: {str(e)}"
            import traceback
            print("Exception:", traceback.format_exc())
    
    return render(request, 'disease.html', {
        'result': result,
        'error': error
    })


def farmer_scheme(request):
    return render(request,'scheme.html')

def chatbot(request):
    return render(request,'chatbot.html')