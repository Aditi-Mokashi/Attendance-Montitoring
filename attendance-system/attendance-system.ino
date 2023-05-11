#include <SPIFFS.h>
#include <AsyncTCP.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>

const char* ssid = "ESP32";
const char* password = "1234567890";
String ip[25];
bool alreadyThere = false,flag = false;
int ipIndex=0,rollIndex=0;
String rollnumber;
int roll[25];
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
      if(ip[temp].equals((request->client()->remoteIP()).toString()) || flag)
      {
        request->send(SPIFFS, "/ty.html", "text/html");
        alreadyThere = true;
      }
      temp--;
    }
    
    if(!alreadyThere)
    {
      request->send(SPIFFS, "/index.html", "text/html");
      flag= false;
    }
    
  });
  server.on("/ty", HTTP_GET, [](AsyncWebServerRequest * request) {
    flag = true;
    alreadyThere = false;
    int temp = ipIndex;
      ipIndex++;
      ip[ipIndex] = (request->client()->remoteIP()).toString();
      Serial.println(ip[ipIndex]);
      request->send(SPIFFS, "/ty.html", "text/html");

     if (request->hasParam("r")) {
      String encodedRoll = request->getParam("r")->value();
      int len_str = encodedRoll.length();
      String rollnumber = base64Decoder(encodedRoll, len_str);
      Serial.println(rollnumber);
      roll[rollIndex] = rollnumber.toInt();
      rollIndex++;
    }
    
  });

   server.on("/admin", HTTP_GET, [](AsyncWebServerRequest * request) {
        request->send(SPIFFS, "/admin_panel.html", "text/html");
    });

  

  
  
  server.begin();
  
}
void loop() {

}

String base64Decoder(String encoded, int len_str)
{
    char* decoded_string;
    decoded_string = (char*)malloc(sizeof(char) * 1000);
    String finalString;
 
    int i, j, k = 0;
 
    // stores the bitstream.
    int num = 0;
 
    // count_bits stores current
    // number of bits in num.
    int count_bits = 0;
 
    // selects 4 characters from
    // encoded string at a time.
    // find the position of each encoded
    // character in char_set and stores in num.
    for (i = 0; i < len_str; i += 4)
    {
        num = 0, count_bits = 0;
        for (j = 0; j < 4; j++)
        {
             
            // make space for 6 bits.
            if (encoded[i + j] != '=')
            {
                num = num << 6;
                count_bits += 6;
            }
 
            /* Finding the position of each encoded
            character in char_set
            and storing in "num", use OR
            '|' operator to store bits.*/
 
            // encoded[i + j] = 'E', 'E' - 'A' = 5
            // 'E' has 5th position in char_set.
            if (encoded[i + j] >= 'A' && encoded[i + j] <= 'Z')
                num = num | (encoded[i + j] - 'A');
 
            // encoded[i + j] = 'e', 'e' - 'a' = 5,
            // 5 + 26 = 31, 'e' has 31st position in char_set.
            else if (encoded[i + j] >= 'a' && encoded[i + j] <= 'z')
                num = num | (encoded[i + j] - 'a' + 26);
 
            // encoded[i + j] = '8', '8' - '0' = 8
            // 8 + 52 = 60, '8' has 60th position in char_set.
            else if (encoded[i + j] >= '0' && encoded[i + j] <= '9')
                num = num | (encoded[i + j] - '0' + 52);
 
            // '+' occurs in 62nd position in char_set.
            else if (encoded[i + j] == '+')
                num = num | 62;
 
            // '/' occurs in 63rd position in char_set.
            else if (encoded[i + j] == '/')
                num = num | 63;
 
            // ( str[i + j] == '=' ) remove 2 bits
            // to delete appended bits during encoding.
            else {
                num = num >> 2;
                count_bits -= 2;
            }
        }
 
        while (count_bits != 0)
        {
            count_bits -= 8;
 
            // 255 in binary is 11111111
            decoded_string[k++] = (num >> count_bits) & 255;
        }
    }
 
    // place NULL character to mark end of string.
    decoded_string[k] = '\0';

  k=0;
    while(decoded_string[k]!='\0')
    {
      finalString.concat(decoded_string[k]);
      k++;
    }
    return finalString;
}
