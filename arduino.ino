int sensor = A0;

int ledVerde = 2;
int ledVermelho = 3;

int valor = 0;

int lerSensor() {
  int soma = 0;

  for (int i = 0; i < 10; i++) {
    soma += analogRead(sensor);
    delay(10);
  }

  return soma / 10;
}

void setup() {
  Serial.begin(9600);

  pinMode(ledVerde, OUTPUT);
  pinMode(ledVermelho, OUTPUT);
}

void loop() {
  valor = lerSensor();

  Serial.println(valor);

  if (valor > 800) { // seco
    digitalWrite(ledVerde, LOW);
    digitalWrite(ledVermelho, HIGH);
  } else { // úmido
    digitalWrite(ledVerde, HIGH);
    digitalWrite(ledVermelho, LOW);
  }

  delay(1000);
}