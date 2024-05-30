# Digi: A Personal Finance App for the Latin American Market.

Digi is the first, PFA (Personal Finance App) created specifically for the Latin American Market.

It integrates with the [Prometo API](https://prometeoapi.com/) in order to authenticate with local Latin American banks and retrieve financial data in a secure, structured way. The app, allows users to link multiple acccounts or credit cards across banks and aggregates all the data into a single UI. Aditionally, it interacts with a categorization engine built using Tensorflow, that categorizes the transactions into a set of pre-defined categories.

### Login Page:
<img src="https://github.com/emilio-quintana-dev/digi/assets/43478497/6c07fc2e-406d-4428-8485-fc1f0930b9c7" width="200">

### Onboarding:
<img src="https://github.com/emilio-quintana-dev/digi/assets/43478497/d6889ccd-7095-4bc1-9597-5c595676abd4" width="200">
<img src="https://github.com/emilio-quintana-dev/digi/assets/43478497/3d175c3d-230c-4782-a8f8-147aed5148f7" width="200">
<img src="https://github.com/emilio-quintana-dev/digi/assets/43478497/198c472e-bdca-4a93-8ff6-35a229bad770" width="200">
<img src="https://github.com/emilio-quintana-dev/digi/assets/43478497/31323488-f826-4529-aa49-26a7c4394921" width="200">
<img src="https://github.com/emilio-quintana-dev/digi/assets/43478497/f2dd95f3-dcd4-4174-8980-196bc7fc34ab" width="200">

### Home Page:
<img src="https://github.com/emilio-quintana-dev/digi/assets/43478497/da81dae1-b8bc-432f-a3e4-97d99ada6298" width="200">

### Transactions Page:
<img src="https://github.com/emilio-quintana-dev/digi/assets/43478497/8fded6f7-8daf-44d2-b2c6-fa1abfb7df65" width="200">

### Link Account Page:
<img src="https://github.com/emilio-quintana-dev/digi/assets/43478497/8330f21f-5fea-4345-badd-fd742829822b" width="200">
<img src="https://github.com/emilio-quintana-dev/digi/assets/43478497/99fba756-61d3-4185-ba81-6a585f81c368" width="200"">

---

## Project Structure:

This repo is divided into three directories:

### The Client (`client` directory):

This folder holds a React Native application built using React Native Paper as the UI component library. 

### The Server  (`api` directory):

This folder holds a RoR API that manages all the business logic of the app. 

### The Classification Engine (`model` directory):

This folder holds a Flask app with a Tensorflow model trained with ~1000 observations that predicts transactions category.

---

## Running the Project locally:

To run the rails server:

- `cd api`
- `bundle install`
- `rails server`

To run the react native app:
- `cd client`
- `yarn install`
- `yarn watch`

To run the classification engine:
- `cd model`
- `docker build . -t digi_prediction_engine`
- `docker run -p 8000:8000 digi_prediction_engine`






