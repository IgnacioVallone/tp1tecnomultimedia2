
//----CONFIGURACION-----
let AMP_MIN = 0.06; // umbral mínimo de sonido que supera al ruido de fondo
let AMP_MAX = 0.12;  // amplitud máxima del sonido

//--------------MICROFONO 
let mic;

//--------------AMPLITUD
let amp;
let haySonido = false;
let hayVolumen = false; //AGREGADO POR TOMI

//--------------IPRIMIR 
let IMPRIMIR=false;

let pinceladas = [];
let cantidad = 13;
let trazos;
let estado;

let miPaleta;
let trazo;
let fondo1

let horizontalLeftCounter = 0;
let verticalRightCounter = 0; 

function preload(){
  miPaleta = new Paleta( "data/noche.png" );
  trazo = loadImage( "data/fondo.png" );
  fondo1 = loadImage("data/fondo1.png")
  for( let i=0 ; i<cantidad ; i++){
    let colores = "data/trazo"+nf( i , 2 )+".png";
    pinceladas[i] = loadImage( colores );
  }
}

function setup() {
  //--------------MICROFONO 
  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();
  createCanvas(windowWidth, windowHeight);
  background(255);
  image(fondo1, 0, 0, width, height);
}

function draw() {
  noStroke();
  if (IMPRIMIR){
    printData();
  }
  
  //--------------AMPLITUD
  amp = mic.getLevel();
  haySonido = amp > AMP_MIN; 
  hayVolumen = amp > AMP_MAX;
  
  if(hayVolumen){  // ESTADO
    if (verticalRightCounter < 600){ 
      for( let i=0 ; i<1 ; i++){
        let x = random( width );
        let y = random( height );
        let xtrazo = int( map( x , 0 , width , 0 , trazo.width ) );
        let ytrazo = int( map( y , 0 , height , 0 , trazo.height ) );
        let colorDeEstePixel = trazo.get( xtrazo , ytrazo );
        if( red( colorDeEstePixel ) < 100 ){
          let cual = int( random(cantidad));
          let tamanio = random( 0.03 , 0.3 );
          let esteColor =  miPaleta.darColor();
          let angulo = radians( map( 500 , 0 , width , 0 , 80 ) + random() );
          let angulo2 = radians( map( 500 , 0 , height, 0 , 80 ) + random() );
          tint( red(esteColor) , green(esteColor) , blue(esteColor) , 250 );
          push();
          translate( x, y );
          rotate( angulo+angulo2 );
          scale( tamanio );
          image( pinceladas[cual] , 0 , 0 );  
          verticalRightCounter++;
          pop();
        }
      }
    }
  }
  if(haySonido){
    if (horizontalLeftCounter < 500){
      for( let i=0 ; i<1 ; i++){
        let x = random( width );
        let y = random( height );
        let xtrazo = int( map( x , 0 , width , 0 , trazo.width ) );
        let ytrazo = int( map( y , 0 , height , 0 , trazo.height ) );
      
        let colorDeEstePixel = trazo.get( xtrazo , ytrazo );
      
        if( red( colorDeEstePixel ) < 100 ){
          let cual = int( random(cantidad));
          let tamanio = random( 0.01 , 0.3 );
      
          let esteColor =  miPaleta.darColor();
          let angulo = radians( map( x , 0 , random , 0 , 100 ) + random(0) );
          let angulo2 = radians( map( y , 0 , random , 0 , 100 ) + random(0) );
      
          tint( red(esteColor) , green(esteColor) , blue(esteColor) , 140 );
      
          push();
          translate( x, y );
          rotate( angulo+angulo2 );
          scale( tamanio );
          image( pinceladas[cual] , 0 , 0 );
          horizontalLeftCounter++;
          pop();
      
        }
      }
   }
    
  }
}





  
  




function printData(){

  background(200);
  push();
  textSize(16);
  fill(0);
  let texto;

  texto = 'amplitud: ' + amp;
  text(texto, 20, 20);

 
  ellipse(width/2, height-amp * 1000, 30, 30);

  pop();

  
}
