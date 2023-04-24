#include <SPIFFS.h>
#include <AsyncTCP.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>

const char* ssid = "ESP32";
const char* password = "1234567890";
String ip[25];
bool alreadyThere = false;
int ipIndex=0;
AsyncWebServer server(80);

void setup() {
  
  Serial.begin(115200);
  
  if(!SPIFFS.begin())
  {
    Serial.println("Failed");
  }

    WiFi.softAP(ssid, password);
    Serial.println(WiFi.softAPIP());

  server.on("/", HTTP_GET, [](AsyncWebServerRequest * request) {
    
    alreadyThere = false;
    int temp = ipIndex;
    while(ipIndex!=0 && !alreadyThere && temp!=-1)
    {
      if(ip[temp].equals((request->client()->remoteIP()).toString()))
      {
        request->send(SPIFFS, "/ty.html", "text/html");
        alreadyThere = true;
      }
      temp--;
    }
    
    if(!alreadyThere)
    {
      ipIndex++;
      ip[ipIndex] = (request->client()->remoteIP()).toString();
      Serial.println(ip[ipIndex]);
      request->send(SPIFFS, "/index.html", "text/html");
    }

     if (request->hasParam("r")) {
      Serial.println(request->getParam("r")->value());
    }
    
  });
  
  server.begin();
  
}
void loop() {

}
