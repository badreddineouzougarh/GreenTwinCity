
# GreenITwinCity Application Deployment

This guide outlines the steps to deploy and use the **GreenITwinCity Application**, including prerequisites, installation, and usage instructions.

---

## Table of Contents

1. [Data Presentation](#1-data-presentation)  
2. [App Overview](#2-app-overview)  
3. [Prerequisites](#3-prerequisites)  
4. [Usage Instructions](#4-usage-instructions)  
   - [Application Deployment](#application-deployment)  
   - [SensorThings Deployment](#sensorthings-deployment)  

---

## 1. Data Presentation

The application leverages two types of data:

- **Static Data**:  
  Includes 3D city models hosted on the [Cesium Ion Cloud](https://cesium.com/cesium-ion/).
  
- **Dynamic Data**:  
  Consists of real-time IoT sensor data. Dynamic data can also include 3D models updated over time based on specifications or conditions.

---

## 2. App Overview

**GreenITwinCity Application** is built using:

- **Framework**: [Next.js](https://nextjs.org/), a React-based framework.  
- **Database**: [PostgreSQL](https://www.postgresql.org/) with the **PostGIS** extension for geospatial data.  
- **IoT Data Management**:  
  - **Fraust Server**: To manage SensorThings API for IoT devices.  
  - **Node-RED**: For orchestrating IoT sensor architecture and managing data pipelines.  

---

## 3. Prerequisites

Before deploying the application, ensure the following tools are installed:

1. **Docker**:  
   Install Docker by following the official [installation guide](https://docs.docker.com/get-docker/).

2. **Fraust Server**:  
   Fraust Server is used to handle SensorThings API. Install it using Docker by following the [Fraust installation guide] ([https://fraustserver.docs](https://fraunhoferiosb.github.io/FROST-Server/sensorthingsapi/1_Home.html)).

3. **Node-RED**:  
   Manage IoT sensor pipelines with Node-RED. Install it either locally or with Docker. Refer to the [Node-RED documentation](https://nodered.org/docs/getting-started/).

4. **Next.js**:  
   Install Node.js and the Next.js framework. For setup:
   ```bash
   npm install next react react-dom
   ```

5. **PostgreSQL with PostGIS**:  
   Install PostgreSQL with PostGIS extensions enabled by following the [official guide](https://postgis.net/install/).

---

## 4. Usage Instructions

### Application Deployment

1. **Clone the Repository**:  
   Use the following command to clone the app repository:
   ```bash
   git clone (https://github.com/badreddineouzougarh/app_deployement.git)
   ```

2. **Install Dependencies**:  
   Inside the project directory, run:
   ```bash
   npm install
   ```

3. **Start the Development Server**:  
   Launch the application with:
   ```bash
   npm run dev
   ```

4. **Access the Application**:  
   The application will run on [http://localhost:3001](http://localhost:3001) by default.

---

### SensorThings Deployment

To set up the SensorThings architecture:

1. **Fraust Server Setup**:
   - Pull the Fraust Server Docker image:
     ```bash
     docker pull fraust/sensorthings
     ```
   - Run the server:
     ```bash
     docker run -d --name fraust-server -p 8080:8080 fraust/sensorthings
     ```

2. **Node-RED Configuration**:
   - Import the Node-RED configuration file provided in the repository (`node-red-flow.json`):
     - Open Node-RED via [http://localhost:1880](http://localhost:1880).
     - Go to **Menu > Import > Clipboard**, paste the JSON, and deploy it.

3. **PostgreSQL with PostGIS**:
   - Use the provided `docker-compose.yml` file to spin up the PostgreSQL database:
     ```bash
     docker-compose up -d
     ```
   - Verify that PostGIS is installed:
     ```sql
     CREATE EXTENSION postgis;
     ```

4. **Connect IoT Data Pipelines**:  
   - Configure Node-RED to send data to the PostgreSQL database.
   - Ensure the database and Fraust server are properly connected.

---

## Notes

- **Static Data**:  
  The static 3D city models must be uploaded to the Cesium Ion platform. Make sure you have your Cesium Ion API credentials configured in the app.

- **Dynamic Data**:  
  The IoT sensor data is fetched from the Fraust server and updated in real time.

---

## Support

For issues or questions, open a ticket in the repository's [Issues section](<repository-link/issues>). 

--- 
