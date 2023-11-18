from flask import Flask, request, jsonify
# from PIL import Image
# import numpy as np
# import torch
#from for_test_V20 import for_test

app = Flask(__name__)

# def preprocess_image(img):
#     img = img.convert('L')
#     img_array = np.array(img)
#     img_tensor = torch.from_numpy(img_array).type(torch.FloatTensor)
#     img_tensor = img_tensor / 255.0
#     img_tensor = img_tensor.unsqueeze(0)
#     img_tensor = img_tensor.unsqueeze(0)
#     return img_tensor

def predict_expression(img_tensor):
    # Assuming for_test is defined and imported correctly
    # attention, prediction = for_test(img_tensor)
    
    prediction_string = 'pani pani pani pani....umcle ji..'
    # img_array = np.array(img_tensor.squeeze(0).squeeze(0))
    
    # for i in range(attention.shape[0]):
    #     if i >= len(prediction):
    #         break
    #     elif prediction[i] == '<eol>':
    #         continue
    #     else:
    #         prediction_string += prediction[i]

    return prediction_string

@app.route('/', methods=['POST'])
def predict():
    try:
        # Get the image file from the POST request
        # print(request.files)
        print("api - api")
        # img_file = request.files['image']
        # img = Image.open(img_file)
        
        # # Preprocess the image
        # img_tensor = preprocess_image(img)
        
        # Make prediction
        # prediction_string = predict_expression(img_tensor)
        prediction_string = predict_expression(' ')
        
        # return jsonify({'prediction': prediction_string, 'message': 'Prediction saved to output.txt'})
        return jsonify({'prediction': prediction_string})
    except Exception as e:
        return jsonify({'error': str(e)})
    
        

if __name__ == '__main__':
    app.run(port=5000)
