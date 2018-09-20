var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */
var helpContent;

var font;
var battery,battery2;
var charge;
var flag;
var OrbControls;

var tor1;
var tor2;
var tor3;
var tor4;

var ox;
var oy;
var plane;
var Ammeter;
var textgeo;
var zero;
var electronGeom;
var electron;
var geomray;
//var line = new Array(10) ;
var line;
var arrow1;
var arrow1A;
var arrow2;
var arrow3;
var arrow4;
var arrow5;
var arrow6;
var arrow2A;
var arrow7;
var arrow8;
var arrow3A;
var arrow4A;
var arrow5A;
var arrow6A;
var arrow7A;
var arrow8A;


function initialiseHelp(){
    helpContent="";
    helpContent = helpContent + "<h2> The AC Circuit laboratory</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment has 2 panel.</p>";
    helpContent = helpContent + "<p>Right Panel contains Draggable equipments (AC Power Source, switch, Resistor, Capacitor, Inductor coil, Bulb, a Voltmeter, an Ammeter and connecting wires).</p>";
    helpContent = helpContent + "<p>These equipments can be dragged and dropped on Demonstration Board to create circuit.(a basic skeleton of circuit is created on the board.)</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The top line has animation Controls. There are two states of the experiment.</p>";
    helpContent = helpContent + "<h4>If the circuit is covered by the table or by Control Panel then you should hide the table(by click on red cross mark) and Control Panel(By click on close controls).</h4>";    
	helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage create circuit by given equipments and set values for given equipments.</p>";
    helpContent = helpContent + "<p>Once you create the circuit and set the values, you can start the animation stage by clicking the start button.</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>In the animation stage, the bulb will glow and capacitor will charge.</p>";
    helpContent = helpContent + "<p>current direction can be shown by arrow or by electron movement.</p>";
    helpContent = helpContent + "<p>An ammeter show the current value in Ampere through the circuit</p>";
	helpContent = helpContent + "<p>you can measure Voltage(rms) across resistor,capacitor or Inductor coil by drag and drop the Voltmeter to these elements.</p>";
	helpContent = helpContent + "<p>AC Power Source shows Voltage in (rms) and frequency in Hz.</p>";
	helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play button on the top line.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo(){
    infoContent =  "";
    infoContent = infoContent + "<h2> The AC Circuit laboratory</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The Experiment shows a AC circuit based on resistor,capacitor and Inductor coil.</p>";
    infoContent = infoContent + "<p>Basic skeleton for RLC circuit is already created on demonstration board.</p>";
    infoContent = infoContent + "<p>When Current flows the capacitor starts charging. </p>";
    infoContent = infoContent + "<p>AC source is used so capacitor polarity will change continuously.</p>";
	infoContent = infoContent + "<p>Bulb brightness is continuously decreases and increases due to Alternative Current.</p>";
	infoContent = infoContent + "<p><b>Bulb resistance : 5ohm </b></p>";
    infoContent = infoContent + "<p><b>Refresh value : </b> for reset values of all equipments.</p>";
    infoContent = infoContent + "<p><b>Reset button : </b>  for reset the experiment.</p>";
	infoContent = infoContent + "<p><b>Table Column :</b></p>";
    infoContent = infoContent + "<p>AC(Vrms)= AC voltage in rms value</p>";
    infoContent = infoContent + "<p>R(ohms)= Resistance in oms value</p>";
	infoContent = infoContent + "<p>L(H)= Inductance in Henries value</p>";
    infoContent = infoContent + "<p>C(uf)= Capacitance in u farad value</p>";
    infoContent = infoContent + "<p>Vr(rms)= Voltage across Resistor</p>";
    infoContent = infoContent + "<p>Vl(rms)= Voltage across Inductor</p>";
    infoContent = infoContent + "<p>Vc(rms)= Voltage across Capacitor</p>";
	infoContent = infoContent + "<p>i(A)= Current in Ampere</p>";
    infoContent = infoContent + "<h3>When you will change values then the data in table will automatically changed.<h3>";
    infoContent = infoContent + "<h2>Happy Experimenting :)</h2>";
    PIEupdateInfo(infoContent);
}
var camera;
function initialiseScene(){
    /* Initialise Scene Variables */
	if(window.innerWidth<1000 && window.innerWidth >=400)
	{ mySceneTLX = 16;
      mySceneTLY = 22;
      mySceneBRX = -16;
      mySceneBRY = -22;
     }
	else if(window.innerWidth <400){
		mySceneTLX = 16;
      mySceneTLY = 40;
      mySceneBRX = -16;
      mySceneBRY = -40;
	}
	else
		{ mySceneTLX = 16;
      mySceneTLY = 12;
      mySceneBRX = -16;
      mySceneBRY = -12;
      }
	  
	  mySceneW   = (mySceneBRX - mySceneTLX);
      mySceneH   = (mySceneTLY - mySceneBRY);
      myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
      myCenterY  = (mySceneTLY + mySceneBRY) / 2.0; 
	
	 PIEscene.background = new THREE.Color("#837e7c");//0xFCEDB2
 	
}
function setbulb()
{   if(reg <=30)
    {
	if(voltage <=20){ bulb.material.opacity = 0.2;
	                 
                    for(var i=0;i<7;i++)
					{ line[i].material.opacity = 0.2; } s=8;h=0;}
	else if( voltage>20 && voltage <= 45) { bulb.material.opacity = 0.5;
	                                        for(var i=0;i<7;i++)
					                       { line[i].material.opacity = 0.5; } 
									        h=0;s=12;}
	else if( voltage>45 && voltage <= 70) { bulb.material.opacity = 0.7;
                                            for(var i=0;i<7;i++)
					                      { line[i].material.opacity = 0.7; }
				                           h=0;s=17;}
	else { bulb.material.opacity = 1.0;
           for(var i=0;i<7;i++)
		  { line[i].material.opacity = 1.0; }
  		  h=0;s=23;} 
	}
	else{
		if(voltage <=20){ bulb.material.opacity = 0.1;
                          for(var i=0;i<7;i++)
					   { line[i].material.opacity = 0.2; }	
          				h=0;s=4;}
	    else if( voltage>20 && voltage <= 45) { bulb.material.opacity = 0.3; 
		                                        for(var i=0;i<7;i++)
					                          { line[i].material.opacity = 0.6; }
				                                h=0;s=9;}
		else if( voltage>45 && voltage <= 70) { bulb.material.opacity = 0.6; 
		                                        for(var i=0;i<7;i++)
				                           	{  line[i].material.opacity = 0.6; }
				                             h=0;s=13;}
	    else { bulb.material.opacity = 0.8; 
		       for(var i=0;i<7;i++)
			 { line[i].material.opacity = 0.8; }
			   h=0;s=17;}
	
	}
	
}
var c=1; 
function setOn(){
	if(fq != 0){
	if(kain1==1 && kain2==1 && kain3==1 && kain4==1 && kain5==1 && kain6 == 1 &&kain7 == 1){
    flag=1;
    bulb.material.color.set("yellow"); 
    setbulb();   
    PIEstartAnimation();
	if(e==1){
	for(var k=0;k<48;k++){
    	electron[k].visible = true;
	}}
	else if(c == 1 ) {  showAntiArrows();}
    swtch.rotation.z=0; 
	}
	}
}
function setOff(){
   // addText();
    flag = 0;
	for(var k=0;k<48;k++){
    	electron[k].visible = false;
	}// kn
	for(var i=0;i<7;i++)
	{ line[i].material.opacity = 0; }
	bulb.material.opacity = 0;
	swtch.rotation.z=Math.PI/4;
    PIEstopAnimation();
	showNoArrows();
    //OrbControls.dispose();
    PIErender();    
}

function addArrows(){
	 //clockwise
     //left wire
	arrow1 = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow1);
    arrow1.position.set(-16.8,-5,0);
   // arrow1.rotation.y = -0.3;
    arrow1.rotation.z = 0.6;
    arrow2 = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow2);
    arrow2.position.set(-17.2,-5,0);
   // arrow2.rotation.y = 0.3;
    arrow2.rotation.z = -0.6;
    //upper wire
    arrow3= new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow3);
    arrow3.position.set(-9,3.75,0);
    arrow3.rotation.z = -Math.PI/3;
    //arrow3.rotation.x += Math.PI/4;
    //arrow3.rotation.z -= 1.2;

    arrow4 = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow4);
    arrow4.position.set(-9,4.1,0);
    arrow4.rotation.z = Math.PI/3;
    //arrow4.rotation.x += Math.PI/4;
    //arrow4.rotation.z += 1.8;

    //right wire
    arrow5 = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow5);
    arrow5.position.set(-0.85,-3,0);
   // arrow5.rotation.x -= 0.8;
    //arrow5.rotation.y -= 0.3;
    arrow5.rotation.z = -0.4;

    arrow6 = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow6);
    arrow6.position.set(-1.15,-3,0);
    //arrow6.rotation.x -= 0.4;
    //arrow6.rotation.y += 0.3;
    arrow6.rotation.z = 0.4;
	//lower wire
	arrow7 = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow7);
    arrow7.position.set(-10,-5.8,0);
    arrow7.rotation.z = -Math.PI/3;
    //arrow3.rotation.z += 1.8;

    arrow8 = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow8);
    arrow8.position.set(-10,-6.2,0);
    arrow8.rotation.z = Math.PI/3;

// anticlockwise
     //left wire
	 arrow1A = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow1A);
    arrow1A.position.set(-16.8,-5,0);
   // arrow1A.rotation.y = -0.3;
    arrow1A.rotation.z = -0.6;

	 arrow2A = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow2A);
    arrow2A.position.set(-17.2,-5,0);
   // arrow2A.rotation.y = 0.3;
    arrow2A.rotation.z = 0.6;
    //upper wire
    arrow3A= new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow3A);
    arrow3A.position.set(-9,3.75,0);
    arrow3A.rotation.z = Math.PI/3;
    //arrow3A.rotation.x += Math.PI/4;
    //arrow3A.rotation.z -= 1.2;

    arrow4A = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow4A);
    arrow4A.position.set(-9,4.1,0);
    arrow4A.rotation.z = -Math.PI/3;
   
    //right wire
    arrow5A = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow5A);
    arrow5A.position.set(-0.85,-3,0);
   // arrow5A.rotation.x -= 0.8;
    //arrow5A.rotation.y -= 0.3;
    arrow5A.rotation.z = 0.4;

    arrow6A = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow6A);
    arrow6A.position.set(-1.15,-3,0);
    //arrow6A.rotation.x -= 0.4;
    //arrow6A.rotation.y += 0.3;
    arrow6A.rotation.z = -0.4;
	//lower wire
	arrow7A = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow7A);
    arrow7A.position.set(-10,-5.8,0);
    arrow7A.rotation.z = Math.PI/3;
    //arrow3.rotation.z += 1.8;

    arrow8A = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.45,32),new THREE.MeshBasicMaterial({color:"red"}));
    PIEaddElement(arrow8A);
    arrow8A.position.set(-10,-6.2,0);
    arrow8A.rotation.z = -Math.PI/3;

}
function showClockArrows() {
    arrow1.visible = true;
    arrow2.visible = true;
    arrow3.visible = true;
    arrow4.visible = true;
    arrow5.visible = true;
    arrow6.visible = true;
    arrow7.visible = true;
	arrow8.visible = true;
	
	arrow1A.visible = false;
    arrow2A.visible = false;
    arrow3A.visible = false;
    arrow4A.visible = false;
    arrow5A.visible = false;
    arrow6A.visible = false;
	arrow7A.visible = false;
	arrow8A.visible = false;
}

function showAntiArrows() {
    arrow1.visible = false;
    arrow2.visible = false;
    arrow3.visible = false;
    arrow4.visible = false;
    arrow5.visible = false;
    arrow6.visible = false;
    arrow7.visible = false;
	arrow8.visible = false;
	
	arrow1A.visible = true;
    arrow2A.visible = true;
    arrow3A.visible = true;
    arrow4A.visible = true;
    arrow5A.visible = true;
    arrow6A.visible = true;
	arrow7A.visible = true;
	arrow8A.visible = true;
}
function showNoArrows(){
    arrow1.visible = false;
    arrow2.visible = false;
    arrow1A.visible = false;
    arrow2A.visible = false;
    arrow3.visible = false;
    arrow4.visible = false;
    arrow5.visible = false;
    arrow6.visible = false;
    arrow7.visible = false;
	arrow8.visible = false;
    arrow3A.visible = false;
    arrow4A.visible = false;
    arrow5A.visible = false;
    arrow6A.visible = false;
	arrow7A.visible = false;
	arrow8A.visible = false;
}


//kn
function define_electrons(){


	electron[0] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[0].position.set(-2,-6,0);
    PIEaddElement(electron[0]);

	electron[1] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[1].position.set(-3,-6,0);
    PIEaddElement(electron[1]);

    electron[2] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[2].position.set(-4,-6,0);
    PIEaddElement(electron[2]);

	electron[3] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[3].position.set(-5,-6,0);
    PIEaddElement(electron[3]);

    electron[4] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[4].position.set(-6,-6,0);
    PIEaddElement(electron[4]);

    electron[5] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[5].position.set(-7,-6,0);
    PIEaddElement(electron[5]);

    electron[6] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[6].position.set(-8,-6,0);
    PIEaddElement(electron[6]);

    electron[7] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[7].position.set(-9,-6,0);
    PIEaddElement(electron[7]);
    
	electron[8] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[8].position.set(-10,-6,0);
    PIEaddElement(electron[8]);

    electron[9] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[9].position.set(-11,-6,0);
    PIEaddElement(electron[9]);


	electron[10] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[10].position.set(-12,-6,0);
    PIEaddElement(electron[10]);

    electron[11] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[11].position.set(-13,-6,0);
    PIEaddElement(electron[11]);

    electron[12] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[12].position.set(-14,-6,0);
    PIEaddElement(electron[12]);

	electron[13] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[13].position.set(-15,-6,0);
    PIEaddElement(electron[13]);

	electron[14] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[14].position.set(-16,-6,0);
    PIEaddElement(electron[14]);

	electron[15] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[15].position.set(-17,-5,0);
    PIEaddElement(electron[15]);

	electron[16] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[16].position.set(-17,-4,0);
    PIEaddElement(electron[16]);

	electron[17] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[17].position.set(-17,-3,0);
    PIEaddElement(electron[17]);
	
	electron[18] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[18].position.set(-17,-2,0);
    PIEaddElement(electron[18]);

	electron[19] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[19].position.set(-17,-1,0);
    PIEaddElement(electron[19]);

	electron[20] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[20].position.set(-17,0,0);
    PIEaddElement(electron[20]);


	electron[21] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[21].position.set(-17,1,0);
    PIEaddElement(electron[21]);

	electron[22] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[22].position.set(-17,2,0);
    PIEaddElement(electron[22]);

	electron[23] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[23].position.set(-17,3,0);
    PIEaddElement(electron[23]);

	electron[24] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[24].position.set(-16,4,0);
    PIEaddElement(electron[24]);


	electron[25] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[25].position.set(-15,4,0);
    PIEaddElement(electron[25]);

	electron[26] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[26].position.set(-14,4,0);
    PIEaddElement(electron[26]);

	electron[27] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[27].position.set(-13,4,0);
    PIEaddElement(electron[27]);


	electron[28] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[28].position.set(-12,4,0);
    PIEaddElement(electron[28]);

	electron[29] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[29].position.set(-11,4,0);
    PIEaddElement(electron[29]);

	electron[30] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[30].position.set(-10,4,0);
    PIEaddElement(electron[30]);

	electron[31] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[31].position.set(-9,4,0);
    PIEaddElement(electron[31]);

	electron[32] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[32].position.set(-8,4,0);
    PIEaddElement(electron[32]);

	electron[33] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[33].position.set(-7,4,0);
    PIEaddElement(electron[33]);

	electron[34] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[34].position.set(-6,4,0);
    PIEaddElement(electron[34]);

	electron[35] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[35].position.set(-5,4,0);
    PIEaddElement(electron[35]);

	electron[36] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[36].position.set(-4,4,0);
    PIEaddElement(electron[36]);

	electron[37] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[37].position.set(-3,4,0);
    PIEaddElement(electron[37]);

	electron[38] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[38].position.set(-2,4,0);
    PIEaddElement(electron[38]);
	
	electron[39] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[39].position.set(-1,3,0);
    PIEaddElement(electron[39]);
	

	electron[40] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[40].position.set(-1,2,0);
    PIEaddElement(electron[40]);
	
	electron[41] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[41].position.set(-1,1,0);
    PIEaddElement(electron[41]);

	electron[42] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[42].position.set(-1,0,0);
    PIEaddElement(electron[42]);

	electron[43] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[43].position.set(-1,-1,0);
    PIEaddElement(electron[43]);

	electron[44] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[44].position.set(-1,-2,0);
    PIEaddElement(electron[44]);

	electron[45] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[45].position.set(-1,-3,0);
    PIEaddElement(electron[45]);

	electron[46] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[46].position.set(-1,-4,0);
    PIEaddElement(electron[46]);

	electron[47] = new THREE.Mesh(electronGeom,new THREE.MeshPhongMaterial({color: "skyblue", transparent: true, opacity: 0.5, shininess: 500}));
    electron[47].position.set(-1,-5,0);
    PIEaddElement(electron[47]);


}//kn

function setElectronPosi(){

	electron[0].position.set(-2,-6,0); // kn lowr wire e-
    electron[1].position.set(-3,-6,0);
    electron[2].position.set(-4,-6,0);
    electron[3].position.set(-5,-6,0);
    electron[4].position.set(-6,-6,0);
    electron[5].position.set(-7,-6,0);
    electron[6].position.set(-8,-6,0);
    electron[7].position.set(-9,-6,0);
    electron[8].position.set(-10,-6,0);
    electron[9].position.set(-11,-6,0);
    electron[10].position.set(-12,-6,0);
    electron[11].position.set(-13,-6,0);
    electron[12].position.set(-14,-6,0);
    electron[13].position.set(-15,-6,0);
    electron[14].position.set(-16,-6,0);// lower wire e-
    electron[15].position.set(-17,-5,0);//left wire e-
    electron[16].position.set(-17,-4,0);
    electron[17].position.set(-17,-3,0);
    electron[18].position.set(-17,-2,0);
    electron[19].position.set(-17,-1,0);
    electron[20].position.set(-17,0,0);
    electron[21].position.set(-17,1,0);
    electron[22].position.set(-17,2,0);
    electron[23].position.set(-17,3,0);
    electron[24].position.set(-16,4,0);//upper wire e-
    electron[25].position.set(-15,4,0);
    electron[26].position.set(-14,4,0);
    electron[27].position.set(-13,4,0);
    electron[28].position.set(-12,4,0);
    electron[29].position.set(-11,4,0);
    electron[30].position.set(-10,4,0);
    electron[31].position.set(-9,4,0);
    electron[32].position.set(-8,4,0);
    electron[33].position.set(-7,4,0);
    electron[34].position.set(-6,4,0);
    electron[35].position.set(-5,4,0);
    electron[36].position.set(-4,4,0);
    electron[37].position.set(-3,4,0);
    electron[38].position.set(-1.5,4,0);//kn
    electron[39].position.set(-1,3,0);//right e-
    electron[40].position.set(-1,2,0);
	electron[41].position.set(-1,1,0);
	electron[42].position.set(-1,0,0);
	electron[43].position.set(-1,-1,0);
	electron[44].position.set(-1,-2,0);
	electron[45].position.set(-1,-3,0);
	electron[46].position.set(-1,-4,0);
	electron[47].position.set(-1,-5,0);
	//electron[48].position.set(-1,-6,0);
	//electron[49].position.set(-1,-7,0);
}//kn

function addWire(x,y,l,ang){
	var wire=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,l,50,1,true), new THREE.MeshStandardMaterial({color: "blue",transparent: true,opacity: 1}));
	wire.position.x=x;
	wire.position.y=y;
	wire.rotation.z+=ang;
	PIEaddElement(wire);
}

//varii
var /*kain0=0*/ kain1=0,kain2=0,kain3=0,kain4=0,kain5=0,kain6=0;kain7=0;



function declareElements(){
   tor1=new THREE.Mesh(new THREE.TorusGeometry(0.08,0.08,50,50,Math.PI/2), new THREE.MeshStandardMaterial({color: 0x00ff00,transparent: true,opacity: 1}));
   tor1.rotation.z+=Math.PI/2;
    PIEaddElement(tor1);
    tor2=new THREE.Mesh(
        new THREE.TorusGeometry(0.08,0.08,50,50,Math.PI/2),
        new THREE.MeshStandardMaterial({color: 0x3d2611,transparent: true,opacity: 1})
        );
    PIEaddElement(tor2);
    tor3=new THREE.Mesh(new THREE.TorusGeometry(0.08,0.08,50,50,Math.PI/2), new THREE.MeshStandardMaterial({color: 0x3d2611,transparent: true,opacity: 1}));
    tor3.rotation.z-=Math.PI/2;
    PIEaddElement(tor3);
    tor4=new THREE.Mesh(new THREE.TorusGeometry(0.08,0.08,50,50,Math.PI/2), new THREE.MeshStandardMaterial({color: 0x3d2611,transparent: true,opacity: 1}));
    tor4.rotation.z-=Math.PI;
    PIEaddElement(tor4);
   
    //Ammeter starts
    Ammeter= new THREE.BoxGeometry(3,3,1);
    Ammeter=new THREE.Mesh(Ammeter,new THREE.MeshPhongMaterial({color: 0x000000}));
    var port1= new THREE.CylinderGeometry(0.3,0.3,0.3,20);
    port1.translate(0,1.65,0);
    port1=new THREE.Mesh(port1,new THREE.MeshLambertMaterial({color: 0x212121}));
    Ammeter.add(port1);
    var port2= new THREE.CylinderGeometry(0.3,0.3,0.3,20);
    port2.translate(0,-1.65,0);
    port2=new THREE.Mesh(port2,new THREE.MeshLambertMaterial({color: 0x212121}));
    Ammeter.add(port2);
    var buffer=new THREE.BoxGeometry(3,0.7,0.5);
    buffer=new THREE.Mesh(buffer,new THREE.MeshStandardMaterial({color: 0x827717}));
    buffer.position.set(8+ox,1.15,0.75);
    var buffer2=new THREE.BoxGeometry(3,1,0.5);
    buffer2=new THREE.Mesh(buffer2,new THREE.MeshStandardMaterial({color: 0x827717}));
    buffer2.position.set(8+ox,-1,0.75);
    var buffer3=new THREE.BoxGeometry(0.4,1.3,0.5);
    buffer3=new THREE.Mesh(buffer3,new THREE.MeshStandardMaterial({color: 0x827717}));
    buffer3.position.set(8+ox-1.3,0.15,0.75);
    var buffer4=new THREE.BoxGeometry(0.4,1.3,0.5);
    buffer4=new THREE.Mesh(buffer4,new THREE.MeshStandardMaterial({color: 0x827717}));
    buffer4.position.set(8+ox+1.3,0.15,0.75);
   
    PIEaddElement(Ammeter);
	Ammeter.add(buffer);
	Ammeter.add(buffer2);
	Ammeter.add(buffer3);
	Ammeter.add(buffer4);
}
//capacitor
var plate1,plate2,coil;
function capacitor()
{
	geometry = new THREE.BoxGeometry(0.2,2.5,2.5);
	material = new THREE.MeshStandardMaterial({color: 0xffffff });
	plate1 = new THREE.Mesh(geometry,material);
	plate1.rotation.y = 0.4;
	plate1.position.set(10.5,5,0);
	plate2 = new THREE.Mesh(geometry,material);
	//plate2.rotation.y = 0.4;
	plate2.position.set(-1.5,0,0);
	plate1.add(plate2);
	PIEaddElement(plate1);
	PIEdragElement(plate1);
	PIEsetDrag(plate1,mycapidrag);
	//PIEsetDragEnd(plate1,capiend);
	loader = new THREE.FontLoader();
    loader.load("optimer.json", function ( font ) {
            var textGeometryim = new THREE.TextGeometry("200 uf", {
                font: font,
                size: 0.4,
                height:0.05,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterialim = new THREE.MeshBasicMaterial( 
                { color: 0x000000}
            );
            var cm = new THREE.Mesh( textGeometryim, textMaterialim );
            cm.position.set(-2,1.5,0);
			cm.rotation.y = -0.4;
            plate1.add(cm);
			
            PIErender();
        });
	}
	 
function mycapidrag(element,newpos)
{    plate1.position.x = newpos.x;
     plate1.position.y = newpos.y;
	if(plate1.position.x <=-2.3 && plate1.position.x>=-4 && plate1.position.y<=-5 && plate1.position.y>=-7)
	 PIEsetDragEnd(plate1,endcapi); 
    else
	{  PIEsetDragEnd(plate1,startcapi); }

}
function startcapi(element,newpos)
{   kain5=0;
    plate1.position.set(10.5,5,0);
}
function endcapi(element,newpos)
{   kain5=1;
	plate1.position.set(-3.3,-6,0); 
}

function mycoildrag(element,newpos)
{
	coil.position.x = newpos.x;
	coil.position.y = newpos.y;
    if(coil.position.x<=-7.6 && coil.position.x>=-9.5 && coil.position.y<=-5 && coil.position.y>=-7)
	PIEsetDragEnd(coil,endcoil);
    else
	PIEsetDragEnd(coil,startcoil); 	
}
function endcoil(element,newpos)
{
	coil.position.set(-8.5,-6,0);
	kain6=1;
}
function startcoil()
{    kain6=0;
	coil.position.set(11,-4.5,0);
}
	//inductor
function inductor()
{
	var geometryI = new THREE.CylinderGeometry(0.8,0.8,3,60);
	var materialI = new THREE.MeshBasicMaterial({color: "white"});
	coil = new THREE.Mesh(geometryI,materialI);
	coil.rotation.z = Math.PI/2;
	coil.position.set(11,-4.5,0);
	PIEaddElement(coil);
	//ring
	var curver = new THREE.CubicBezierCurve3(
    new THREE.Vector3( 1, 0, 0 ),
    new THREE.Vector3( 1, 0, 0 ),
    new THREE.Vector3( 1, 0, 0 ),
    new THREE.Vector3( 3.2, 0, 0 )
    );

    var tuber = new THREE.TubeGeometry(curver,25, 0.85, 100, true);
    var meshr = new THREE.Line(tuber, new THREE.MeshBasicMaterial({color: "brown", transparent:true , opacity: 0.8}));
    meshr.rotation.z = Math.PI/2;
    coil.add(meshr);
	meshr.position.set(0.025,-2,0);
	PIEdragElement(coil);
	PIEsetDrag(coil,mycoildrag);
	loader = new THREE.FontLoader();
    loader.load("optimer.json", function ( font ) {
            var textGeometryim = new THREE.TextGeometry("1.0 H", {
                font: font,
                size: 0.4,
                height:0.05,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterialim = new THREE.MeshBasicMaterial( 
                { color: 0x000000}
            );
            var im = new THREE.Mesh( textGeometryim, textMaterialim );
            im.position.set(1,1,0);
			im.rotation.z = -Math.PI/2;
            coil.add(im);
			
            PIErender();
        });
}	
function AmText()
{        loader = new THREE.FontLoader();
         loader.load("optimer.json", function ( font ) {
         var texGeometry2 = new THREE.TextGeometry( "AM(rms)", {
                font: font,
                size: 0.35,
                height:0,
                curveSegments: 12,
                bevelThickness: 0.001,
                bevelSize: 0.001,
                bevelEnabled: true
            });
            var texMaterial2 = new THREE.MeshBasicMaterial( 
                { color: 0x000000}
            );
            tammeter = new THREE.Mesh( texGeometry2, texMaterial2);
            tammeter.position.set(8+ox-0.9,-1,1);
            // PIEaddElement(tammeter); 
		    // ammeter value
			 Ammeter.remove(zero);
			 Ammeter.add(tammeter);
			 // k1 = all elements are set
	        if( kain4 == 1 && flag == 1 && k1 ==1){ ai = ic.toFixed(3);  ti = ic.toFixed(3); }
            if( kain4 == 0 || flag == 0)
			{ ai = "0.00"; }	
            var texGeometry = new THREE.TextGeometry( ai+"A",{
                font: font,
                size: 0.5,
                height:0.1,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var texMaterial = new THREE.MeshPhongMaterial( 
                { color: 0xff0000, specular: 0xffffff,transparent:true,opacity:1}
            );
			
            zero = new THREE.Mesh( texGeometry, texMaterial);
            zero.position.set(-1,0,0.41);
            //PIEaddElement(zero);
			Ammeter.add(zero);
           
		PIErender();
});
}

function addBatteryText(){
        loader = new THREE.FontLoader();
        loader.load("optimer.json", function ( font ) {
            var textGeometry = new THREE.TextGeometry("Battery", {
                font: font,
                size: 0.3,
                height:0.05,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            var textMaterial = new THREE.MeshBasicMaterial( 
                { color: 0x000000}
            );
            var bt = new THREE.Mesh( textGeometry, textMaterial );
            bt.position.set(-7+ox,0,0.41);
            PIEaddElement( bt );
			
            PIErender();
        });
		loader.load("optimer.json", function ( font ) {
            var textGeometry1 = new THREE.TextGeometry("Switch", {
                font: font,
                size: 0.3,
                height:0.05,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
			 var textMaterial = new THREE.MeshBasicMaterial( 
                { color: 0x000000}
            );
			var sw = new THREE.Mesh(textGeometry1, textMaterial);
			sw.position.set(-14,3,0);
			PIEaddElement(sw);
			PIErender();
		});
		loader.load("optimer.json", function ( font ) {
            var textGeometry1 = new THREE.TextGeometry("Bulb", {
                font: font,
                size: 0.3,
                height:0.05,
                curveSegments: 12,
                bevelThickness: 0.5,
                bevelSize: 1,
                bevelEnabled: false
            });
			 var textMaterial = new THREE.MeshBasicMaterial( 
                { color: 0x000000}
            );
			var bl = new THREE.Mesh(textGeometry1, textMaterial);
			bl.position.set(-4.5,3,0);
			PIEaddElement(bl);
			PIErender();
		});
		
		loader.load("optimer.json", function ( font ) {
            var textGeometry1 = new THREE.TextGeometry("Ammeter", {
                font: font,
                size: 0.3,
                height:0.05,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
			 var textMaterial = new THREE.MeshBasicMaterial( 
                { color: 0x000000}
            );
			var am = new THREE.Mesh(textGeometry1, textMaterial);
			am.position.set(-2,0,0);
			PIEaddElement(am);
			PIErender();
		});
		loader.load("optimer.json", function ( font ) {
            var textGeometry1 = new THREE.TextGeometry("Resistor/Wire", {
                font: font,
                size: 0.3,
                height:0.05,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
			 var textMaterial = new THREE.MeshBasicMaterial( 
                { color: 0x000000}
            );
			var rg = new THREE.Mesh(textGeometry1, textMaterial);
			rg.position.set(-15,-7,0);
			PIEaddElement(rg);
			PIErender();
		});
		loader.load("optimer.json", function ( font ) {
            var textGeometry1 = new THREE.TextGeometry("Capacitor", {
                font: font,
                size: 0.3,
                height:0.05,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
			 var textMaterial = new THREE.MeshBasicMaterial( 
                { color: 0x000000}
            );
			var cp = new THREE.Mesh(textGeometry1, textMaterial);
			cp.position.set(-4.5,-8,0);
			PIEaddElement(cp);
			PIErender();
		});
		loader.load("optimer.json", function ( font ) {
            var textGeometry1 = new THREE.TextGeometry("Inductor", {
                font: font,
                size: 0.3,
                height:0.05,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
			 var textMaterial = new THREE.MeshBasicMaterial( 
                { color: 0x000000}
            );
			var cp = new THREE.Mesh(textGeometry1, textMaterial);
			cp.position.set(-9.5,-7.5,0);
			PIEaddElement(cp);
			PIErender();
		});
		loader.load("optimer.json", function ( font ) {
            var textGeometry1 = new THREE.TextGeometry("# Grab Bag #", {
                font: font,
                size: 0.6,
                height:0.05,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
			 var textMaterial = new THREE.MeshBasicMaterial( 
                { color: "pink"}
            );
			var cp = new THREE.Mesh(textGeometry1, textMaterial);
			cp.position.set(6,8.4,0);
			PIEaddElement(cp);
			PIErender();
		});
		
}
//vishal 3
function myAmDrag(element,newpos)
{
	Ammeter.position.x = newpos.x;
	Ammeter.position.y = newpos.y;
	if(Ammeter.position.x<=0 && Ammeter.position.x>=-2 && Ammeter.position.y<=1 && Ammeter.position.y>=-1)
	{ PIEsetDragEnd(Ammeter,endam); }
   else
   // if(Ammeter.position.x>=3)
	{  PIEsetDragEnd(Ammeter,startam); }

}
function startam(element,newpos)
{
	Ammeter.position.set(6,0.5,0);kain4=0;
}
function endam(element,newpos)
{
	Ammeter.position.set(-1,0,0); kain4=1;
}
function positionElements(){
    tor1.position.set(-8.89+ox,3.85+oy,0);
    tor2.position.set(6.89+ox,3.85+oy,0);
    tor3.position.set(6.89+ox,-5.92+oy,0);
    tor4.position.set(-8.89+ox,-5.92+oy,0);
    Ammeter.position.set(6,0.5,0);
	PIEdragElement(Ammeter);
	PIEsetDrag(Ammeter,myAmDrag);
	//vmeter.position.set(11,-1,0);
    addWire(7+ox,-3.8,4.21,0);  	//Wire1 Am n
	addWire(7+ox,2.9,2.1,0);  //Am u
    addWire(-9+ox,-4,4,0);             //Wire2 cell n
    addWire(-9+ox,2.8,2.3,0);              //Wire3  cell u
    addWire(-7.65+ox,3.93,2.8,Math.PI/2); //Wire4 u l
	addWire(-0.1+ox,3.93,6.3,Math.PI/2);  // u bich
    addWire(5.7+ox,3.93,2.4,Math.PI/2);  //Wire5
    //lower wire rlc
	addWire(-8+ox,-6,2,Math.PI/2);  	// R wire l
	addWire(-3+ox,-6,3,Math.PI/2);   // R wire r
    addWire(6+ox,-6,2,-Math.PI/2);   // capacitor wire r
    addWire(2+ox,-6,2.3,-Math.PI/2);   // cap. wire l
  
}
/*function addElements(){

}*/
//vishal 2
// bulb drag
function end1(element,newpos)
{  bulb.position.set(-4.3,5.5,0);
   kain3 = 1;
}	
function start1(element,newpos)
{
	bulb.position.set(6,-4,0);
	kain3 = 0;
}
function myBulbbDrag(element,newpos)
{
 bulb.position.x= newpos.x;
 bulb.position.y= newpos.y;
 if(bulb.position.x<=-3 && bulb.position.x>=-5.5 && bulb.position.y<=6.5 && bulb.position.y>=4.5)
 {PIEsetDragEnd(bulb,end1); }
 else
 { PIEsetDragEnd(bulb,start1); }
}
//  battery drag
function myBatteryDrag(element,newpos){
	battery.position.x = newpos.x;
	battery.position.y = newpos.y;
	//battery.position.z = newpos.z;
	if(battery.position.x<=-15.5 && battery.position.x>=-18 && battery.position.y<=2 && battery.position.y>=-2.5)
	{ PIEsetDragEnd(battery,endb); }
	else
    //if(battery.position.x>=-16 && battery.position.x<=-17.5 && battery.position.y<=-1 && battery.position.y>=1)
	{ PIEsetDragEnd(battery, startb); }
}
function endb(element,newpos)
{
	battery.position.set(-17,0,0);
	kain1 = 1;
}
function startb(element,newpos)
{ battery.position.set(6,5.5,0);
  kain1 = 0; }

function myswDrag(element,newpos)
{
	mount.position.x = newpos.x;
	mount.position.y = newpos.y;
	if(mount.position.x <=-12 && mount.position.x>=-15&& mount.position.y<=5 && mount.position.y>=3)
	 PIEsetDragEnd(mount,endsw); 
   else
	{ PIEsetDragEnd(mount,startsw); }
}
function endsw(element,newpos)
{ mount.position.set(-14,4,0);
   kain2 = 1; }
function startsw(element,newpos)
{ mount.position.set(5.5,-8.5,0); 
   kain2 = 0; }

//resistor
function myreDrag(element,newpos)
{
	resistor.position.x = newpos.x;
	resistor.position.y = newpos.y;
	if(resistor.position.x <=-12.5 && resistor.position.x>=-14.5 && resistor.position.y<=-5 && resistor.position.y>=-7)
	 PIEsetDragEnd(resistor,endrg); 
    else
	{ PIEsetDragEnd(resistor,startrg); }
}
function endrg(element,newpos)
{  resistor.position.set(-13.7,-5.92,0);
   wired.position.set(11,-7.5,0); 
   kain7 = 1; r=0; }
function startrg(element,newpos)
{  resistor.position.set(11,-8.5,0); 
   kain7 = 0; r=0;}
   //wire drag
function wiredrag(element,newpos)
{   
	wired.position.x = newpos.x;
	wired.position.y = newpos.y;
	if(wired.position.x <=-12.5 && wired.position.x >=-14.5 && wired.position.y<=-5 && wired.position.y>=-7)
	PIEsetDragEnd(wired,endwr); 
    else
   { PIEsetDragEnd(wired,startwr); }
   
}
var r;
function endwr(element,newpos)
{ wired.position.set(-13.7,-5.92,0);
  resistor.position.set(11,-8.5,0);
   kain7 = 1;
   r=1;  
 }
function startwr(element,newpos)
{ wired.position.set(11,-7.5,0); 
   kain7 = 0;
   r=0;
  }
function voltmeter()
{
	vmeter= new THREE.BoxGeometry(3,3,1);
    vmeter=new THREE.Mesh(vmeter,new THREE.MeshPhongMaterial({color: 0x000000}));
    var port1= new THREE.CylinderGeometry(0.3,0.3,0.3,20);
    port1=new THREE.Mesh(port1,new THREE.MeshLambertMaterial({color: 0x212121}));
	port1.position.set(-1.6,-0.2,0);
	port1.rotation.z = Math.PI/2;
    vmeter.add(port1);
    var port2= new THREE.CylinderGeometry(0.3,0.3,0.3,20);
    port2=new THREE.Mesh(port2,new THREE.MeshLambertMaterial({color: 0x212121}));
	port2.position.set(1.6,-0.2,0);
	port2.rotation.z = Math.PI/2;
    
    vmeter.add(port2);
    var buffer=new THREE.BoxGeometry(3,0.7,0.5);
    buffer=new THREE.Mesh(buffer,new THREE.MeshStandardMaterial({color: 0xffff00}));
    buffer.position.set(0,1.15,0.75);
    var buffer2=new THREE.BoxGeometry(3,1,0.5);
    buffer2=new THREE.Mesh(buffer2,new THREE.MeshStandardMaterial({color: 0xffff00}));
    buffer2.position.set(0,-1,0.75);
    var buffer3=new THREE.BoxGeometry(0.4,1.3,0.5);
    buffer3=new THREE.Mesh(buffer3,new THREE.MeshStandardMaterial({color: 0xffff00}));
    buffer3.position.set(1.3,0.15,0.75);
    var buffer4=new THREE.BoxGeometry(0.4,1.3,0.5);
    buffer4=new THREE.Mesh(buffer4,new THREE.MeshStandardMaterial({color: 0xffff00}));
    buffer4.position.set(-1.3,0.15,0.75);
	
    PIEaddElement(vmeter);
	vmeter.add(buffer);
	vmeter.add(buffer2);
	vmeter.add(buffer3);
	vmeter.add(buffer4);
	vmeter.position.set(11,0.5,0);//13.5,1,0 //I = -8.5
	PIEdragElement(vmeter);
	PIEsetDrag(vmeter,myvmDrag);
	addCurvedWire();
	//vmText();
	PIErender();
    
}
//voltmeter wire
 function addCurvedWire(){
    
    var curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3( 1.6, -0.2, 0 ),
    new THREE.Vector3( 2.5, 0, 0 ),
    new THREE.Vector3( 2.7, 0, 0 ),
    new THREE.Vector3( 1.9, -3.7, 0 )
    );

    var tube = new THREE.TubeGeometry(curve, 40, 0.05, 20, false);
    var mesh = new THREE.Mesh(tube, new THREE.MeshBasicMaterial({color: "black"}));

    vmeter.add(mesh);
	
	var curve3 = new THREE.CubicBezierCurve3(
    new THREE.Vector3( -1.6, -0.2, 0 ),
    new THREE.Vector3( -2.5, 0, 0 ),
    new THREE.Vector3( -2.7, 0, 0 ),
    new THREE.Vector3( -1.9, -3.7, 0 )
    );

    var tube3 = new THREE.TubeGeometry(curve3, 40, 0.05, 20, false);
    var mesh3 = new THREE.Mesh(tube3, new THREE.MeshBasicMaterial({color: "black"}));

    vmeter.add(mesh3);

}
var rlc=0;
function myvmDrag(element,newpos)
{
	vmeter.position.x = newpos.x;
	vmeter.position.y = newpos.y;
	if(vmeter.position.x <=-3 && vmeter.position.x >=-4.5 && vmeter.position.y <=-1.5 && vmeter.position.y >=-4)
	{ PIEsetDragEnd(vmeter,endvmC); }
 else if(vmeter.position.x <=-7.8 && vmeter.position.x >=-9 && vmeter.position.y <=-1.5 && vmeter.position.y >=-4)
	{ PIEsetDragEnd(vmeter,endvmI); }
 else if(vmeter.position.x <=-12.5 && vmeter.position.x >=-14.5 && vmeter.position.y <=-1.5 && vmeter.position.y >=-4)
	{ PIEsetDragEnd(vmeter,endvmR); }
    else
	{ PIEsetDragEnd(vmeter,startvm); }

}
function startvm(element,newpos)
{
	vmeter.position.set(11,0.5,0);
    kain=0; rlc=0;
}
function endvmC(element,newpos)
{
	vmeter.position.set(-4,-2.5,0); 
    kain=1; rlc = 1;	
}
function endvmI(element,newpos)
{
	vmeter.position.set(-8.5,-2.5,0); 
    kain=1; rlc = 2;	
}
function endvmR(element,newpos)
{
	vmeter.position.set(-13.5,-2.5,0); 
    kain=1; rlc = 3;	
}
var tvmeter,kain=0;
var i,v,sakshi,zerov;
function vmText(){
         loader = new THREE.FontLoader();
         loader.load("optimer.json", function ( font ) {
         var texGeometry2 = new THREE.TextGeometry("VM(rms)", {
                font: font,
                size: 0.35,
                height:0,
                curveSegments: 12,
                bevelThickness: 0.001,
                bevelSize: 0.001,
                bevelEnabled: true
            });
            var texMaterial2 = new THREE.MeshBasicMaterial( 
                { color: 0x000000}
            );
            tvmeter = new THREE.Mesh( texGeometry2, texMaterial2);
            tvmeter.position.set(8+ox-0.9,-1,1);
			vmeter.add(tvmeter);
            vmeter.remove(zerov);			
			if(rlc == 1 && kain == 1 && flag == 1){ v = ic*xc; vc=v.toFixed(2); }
			else if(rlc == 2 && kain == 1 && flag == 1){v = ic*xl; vl= v.toFixed(2); }
			else if(rlc == 3 && kain == 1 && flag == 1 && r!=1){v = ic*reg; vr=v.toFixed(2); }
			else { v = 0; }
			if(kain1==1 && kain2==1 && kain3==1 &&kain4==1&&kain5==1&&kain6==1&kain7==1 && flag ==1){ sakshi = v.toFixed(2);}
			else				
			{sakshi = "0.00"; }
		    texGeometry = new THREE.TextGeometry( sakshi+"V", {
                font: font,
                size: 0.5,
                height:0.1,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            });
            texMaterial = new THREE.MeshPhongMaterial( 
                { color: 0xff0000, specular: 0xffffff,transparent:true,opacity:1}
            );
            zerov = new THREE.Mesh( texGeometry, texMaterial);
            zerov.position.set(-1,0,0.41);
         	vmeter.add(zerov);
		    PIErender();
});
}

//swtch
function addBall(x, y, z){
    var ballGeom = new THREE.SphereGeometry(0.3, 32, 24);
    var ball = new THREE.Mesh(ballGeom, new THREE.MeshPhongMaterial({color:"black"}));
    ball.position.set(x, y, z);
    PIEaddElement(ball);
    return ball;
}
// vmeter finish
var bulb,loader,battery,resistor,vmeter,wired;
var swtch,connector,mount;
var  texGeometry, textMaterial
// checkbox
var e=0;
function initCurrentflow()
{   PIEaddInputCheckbox("Current Flow",true,Currentflow);
	PIEchangeInputCheckbox("Electron Flow",false);
}
function initElectronflow()
{   PIEchangeInputCheckbox("Current Flow",false);
    PIEaddInputCheckbox("Electron Flow",true,Electronflow);
	}
function Currentflow()
{   e=0;
    c=1;
	PIEchangeInputCheckbox("Current Flow",true);
	PIEchangeDisplayCheckbox("Current Flow",true);
	PIEchangeInputCheckbox("Electron Flow",false);
	PIEchangeDisplayCheckbox("Electron Flow",false);
	//PIEresetExperiment();
}	
function Electronflow()
{
	PIEchangeInputCheckbox("Electron Flow",true);
	PIEchangeDisplayCheckbox("Electron Flow",true);
	PIEchangeInputCheckbox("Current Flow",false);
	PIEchangeDisplayCheckbox("Current Flow",false);
	e=1;
	c=0;
	//PIEresetExperiment();
}

function Observalue() {
	PIEcreateTable("TABLE", 2, 8, true);
    var headerRow=["AC(Vrms) |","R(ohms) |","L(H) |","C(uf) |","Vr(rms) |","Vl(rms) |","Vc(rms) |","i(A)"];
    PIEupdateTableRow(0, headerRow);
	PIEupdateTableRow(1,[0,0,0,0,0,0,0,0]);
	PIEtoggleTable(true);
  
	PIErender();
}
	function resetexp()
{
	PIEchangeDisplayText("Time(s)",0);
    setElectronPosi();    
	vc=0;
	vr=0; vl=0; vc=0; ti=0;
    PIEremoveElement(plus1);
	PIEremoveElement(plus2);
	PIEremoveElement(sub);
	
	PIEchangeInputSlider("AC Voltage : ", 10);
	handleVolt(10);
    PIEchangeInputSlider("AC Freq.(Hz) : ", 0.5);
	handleFq(0.5);
	PIEchangeInputSlider("Inductor : ", 10);
	handleInd(10);
    PIEchangeInputSlider("Resistor : ", 10);
	handleReg(10);
	PIEchangeInputSlider("Capacitance : ", 100);
	handlecapi(100);
	PIEupdateTableRow(1,[voltage,reg,ind,farad,vr,vl,vc,ti]); 
    PIErender();
}
//slider functions	
function slider()
{   PIEaddInputCommand("Refresh values",resetexp);
    a = "AC Voltage : " + voltage + " V";
	//initreversebattery();
    PIEaddInputSlider("AC Voltage : ",10,handleVolt, 10, 100,5);
	PIEaddDisplayCommand(a, test);
	PIEaddInputSlider("AC Freq.(Hz) : ",0.5,handleFq, 0.0, 2.0, 0.1);
    PIEaddDisplayCommand("AC Freq.(Hz) : "+ fq +" Hz",test);
    PIEaddInputSlider("Resistor : ",10,handleReg, 10, 50, 5);
    PIEaddDisplayCommand("Resistor : "+ reg +" ohm", test);
	PIEaddInputSlider("Inductor : ",10,handleInd, 10, 100, 5);
    PIEaddDisplayCommand("Inductor : "+ ind +" H", test);
	PIEaddInputSlider("Capacitor : ",100,handlecapi, 100, 200, 5);
    PIEaddDisplayCommand("Capacitor : "+ farad +" uf", test);
	PIEaddDisplayText("Time(s)", 0);
    initElectronflow();
    initCurrentflow();
 }
function test(){}
var ind = 10;
function handleInd(newi)
{
	PIEchangeDisplayCommand("Inductor : "+ ind +" H","Inductor : "+ newi +" H");
	ind = newi;
}
var fq = 0.5;
function handleFq(newfq)
{
	PIEchangeDisplayCommand("AC Freq.(Hz) : "+ fq +" Hz","AC Freq.(Hz) : "+ newfq +" Hz");
	fq = newfq;
	
}
var farad = 100;
function handlecapi(newv){
	PIEchangeDisplayCommand("Capacitor : " + farad + " uf","Capacitor : " + newv + " uf");
	farad = newv;
	
}
var voltage=10,a;
function handleVolt(newvalue){
	PIEchangeDisplayCommand("AC Voltage : " + voltage + " V","AC Voltage : " + newvalue + " V");
    voltage = newvalue;
}
var reg = 10;
function handleReg(vib)
{   PIEchangeDisplayCommand("Resistor : " + reg + " ohm","Resistor : " + vib + " ohm");
    reg = vib;
	
}
/*var controls;
function startOrbitalControls() {
    controls = new THREE.OrbitControls(PIEcamera, PIErenderer.domElement);
}*/
//fun 1
var w6,w7,w8;
var circle;
function loadExperimentElements(){
	
    PIEsetExperimentTitle("The AC Circuit laboratory");
    PIEsetDeveloperName("Vishal Kumar Choudhary");
    initialiseHelp();
    initialiseInfo();
    initialiseScene();
	slider();
	addArrows();
	showNoArrows();
	capacitor();
	inductor();
	Observalue();
    addBatteryText();
	electronGeom = new THREE.SphereGeometry(0.2,40,24);
	
   // var controls = new THREE.OrbitControls(PIEcamera, PIErenderer.domElement);
	
    electron = new Array(60);

    //electrontext();
	define_electrons();
	for(var k=0;k<48;k++){
    	electron[k].visible = false;
	}//kn
    voltmeter();
	//bulb
	var bottomGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.7, 32);
    var bulbBottom = new THREE.Mesh(bottomGeo, new  THREE.MeshPhongMaterial({
        color: "black",
        transparent: false
        }));
   
    bulbBottom.position.set(0, -1.5, 0);
    bulbGeo = new THREE.SphereGeometry(1.5, 50, 24);
    bulb = new THREE.Mesh(bulbGeo, new THREE.MeshPhongMaterial({
         color: "white",
    transparent: true, opacity :0, shininess: 1000 }));
	bulb.position.set(6, -4, 0);
    PIEaddElement(bulb);
	var geom = new THREE.RingGeometry(1.52,1.59,60);
	var circle = new THREE.Mesh(geom,new THREE.MeshBasicMaterial({ color : "black" }));
	bulb.add(circle);
	//PIEaddElement(circle);
	var geoml = new THREE.CylinderGeometry(0.03,0.03,1,60);
	var linet = new THREE.Mesh(geoml,new THREE.MeshBasicMaterial({ color : "black" }));
	linet.position.set(-0.5,-0.8,0);
	bulb.add(linet);
	var linet2 = new THREE.Mesh(geoml,new THREE.MeshBasicMaterial({ color : "black" }));
	linet2.position.set(0.5,-0.8,0);
	bulb.add(linet2);
	var linet3 = new THREE.Mesh(geoml,new THREE.MeshBasicMaterial({ color : "black" }));
	linet3.position.set(0,-0.3,0);
	linet3.rotation.z = Math.PI/2;
	bulb.add(linet3);
    line = new Array(10);
	// ray
	geomray = new THREE.CylinderGeometry(0.06,0.06,2.5,80);	
	line[0] = new THREE.Mesh(geomray,new THREE.MeshPhongMaterial({ color : "yellow",transparent: true, opacity : 0}));
	line[0].position.set(0,3,0);
	bulb.add(line[0]);
    line[1] = new THREE.Mesh(geomray,new THREE.MeshPhongMaterial({ color : "yellow",transparent: true, opacity : 0 }));
	line[1].position.set(-2.8,1,0);
	line[1].rotation.z = 1;
	bulb.add(line[1]);
	line[2] = new THREE.Mesh(geomray,new THREE.MeshPhongMaterial({ color : "yellow",transparent: true, opacity : 0 }));
	line[2].position.set(-1.7,2.5,0);
	line[2].rotation.z = 0.5;
	bulb.add(line[2]);
	//left
	line[3] = new THREE.Mesh(geomray,new THREE.MeshPhongMaterial({ color : "yellow",transparent: true, opacity : 0 }));
	line[3].position.set(2.8,1,0);
	line[3].rotation.z = -1;
	bulb.add(line[3]);
	line[4] = new THREE.Mesh(geomray,new THREE.MeshPhongMaterial({ color : "yellow",transparent: true, opacity : 0 }));
	line[4].position.set(1.7,2.5,0);
	line[4].rotation.z = -0.5;
	bulb.add(line[4]);
	//both horizontol
	line[5] = new THREE.Mesh(geomray,new THREE.MeshPhongMaterial({ color : "yellow",transparent: true, opacity : 0 }));
	line[5].position.set(-3,-0.5,0);
	line[5].rotation.z = 1.5;
	bulb.add(line[5]);
	line[6] = new THREE.Mesh(geomray,new THREE.MeshPhongMaterial({ color : "yellow",transparent: true, opacity : 0 }));
	line[6].position.set(3,-0.5,0);
	line[6].rotation.z = -1.5;
	bulb.add(line[6]);
	// bulb structure finish
	
	bulb.add(bulbBottom);
	PIEdragElement(bulb);
	PIEsetDrag(bulb,myBulbbDrag);
	PIErender();
	
	//resistor
	  loader = new THREE.TextureLoader();
      loader.load("r.png", function(texture){
      var geometry = new THREE.PlaneBufferGeometry(4.5,4.7,0);
      var material = new THREE.MeshBasicMaterial({map:texture});
	  material.transparent = true;
      resistor = new THREE.Mesh(geometry, material);
	  resistor.position.set(11,-8.5,0);
	  PIEaddElement(resistor);
      PIEdragElement(resistor);
      PIEsetDrag(resistor, myreDrag);	  
      PIErender();
    });
	//wire 
	var geometry = new THREE.CylinderGeometry(0.1, 0.1, 5, 32);
    wired = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
        color: "gray"
    }));
	wired.position.set(11,-7.5,0);
	wired.rotation.z = Math.PI/2;
	PIEaddElement(wired);
	PIEdragElement(wired);
    PIEsetDrag(wired, wiredrag);   
     
	//switch
	  connector = addBall(-11.5,4, 0);
      mount = addBall(5.5, -8.5, 0);

    var switchGeom = new THREE.BoxGeometry(3, .4, .4);
    switchGeom.translate(1, 0, 0);
    swtch = new THREE.Mesh(switchGeom, new THREE.MeshLambertMaterial({color: "white"}));
    swtch.rotation.z = Math.PI / 4;
    mount.add(swtch);
	PIEdragElement(mount);//drag mount
    PIEsetDrag(mount, myswDrag);	  
    PIErender();
  
	// AC power source
	var geomac = new THREE.BoxGeometry(3,3.6,1);
	var materialac = new THREE.MeshStandardMaterial({ color : "gray" });
	battery = new THREE.Mesh( geomac, materialac );
	battery.position.set(6,5.5,0);
	var geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.3, 32);
    var plug1 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
        color: "black"
    }));
	plug1.position.set(0,-1.9,0);
	battery.add(plug1);
	var plug2 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
        color: "black"
    }));
	plug2.position.set(0,1.9,0);
	battery.add(plug2);
	//PIEaddElement(ac);
    PIEaddElement(battery);
    PIEdragElement(battery);
    PIEsetDrag(battery, myBatteryDrag);	  
	//ac power source text
	var loaderAc = new THREE.FontLoader();
     loaderAc.load("optimer.json", function ( font ) {
         var texGeometryAc = new THREE.TextGeometry("AC Source", {
                font: font,
                size: 0.4,
                height:0.05,
                curveSegments: 12,
                bevelThickness: 0.001,
                bevelSize: 0.001,
                bevelEnabled: true
            });
            var texMaterialAc = new THREE.MeshBasicMaterial( 
                { color: 0x000000}
            );
            var textAc = new THREE.Mesh( texGeometryAc, texMaterialAc);
            textAc.position.set(-1.3,0.5,0.45);
	        battery.add(textAc); });
	var loaderAc2 = new THREE.FontLoader();
     loaderAc2.load("optimer.json", function ( font ) {
         var texGeometryAc2 = new THREE.TextGeometry("(Vrms,Hz)", {
                font: font,
                size: 0.4,
                height:0.05,
                curveSegments: 12,
                bevelThickness: 0.001,
                bevelSize: 0.001,
                bevelEnabled: true
            });
            var texMaterialAc2 = new THREE.MeshBasicMaterial( 
                { color: 0x000000}
            );
            var textAc2 = new THREE.Mesh( texGeometryAc2, texMaterialAc2);
            textAc2.position.set(-1.3,-0.5,0.45);
	        battery.add(textAc2); });
	
	
	//dragable element background
	geometry = new THREE.BoxGeometry(11,20.5,0);
	material = new THREE.MeshStandardMaterial({color: "black", transparent: true, opacity: 0.3 });
	var bg = new THREE.Mesh(geometry,material);
	bg.position.set(9.5,-0.5,-2);
	PIEaddElement(bg);
  
    //OrbControls = new THREE.OrbitControls(PIEcamera, PIErenderer.domElement);
    //OrbControls.dispose();
    document.getElementById("start").addEventListener("click",setOn);
    document.getElementById("stop").addEventListener("click", setOff);
    ox=-8;oy=0;sel=0;
	  declareElements();		// adding all elements in scene
      positionElements();
	  
	  
	  PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
  PIErender();
}

function resetExperiment(){
	PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
	PIEchangeDisplayText("Time(s)",0);
    setElectronPosi();    
	vc=0;
	vr=0; vl=0;vc=0;ti=0;
	
    PIEremoveElement(plus1);
	PIEremoveElement(plus2);
	PIEremoveElement(sub);
	
	PIEchangeInputSlider("AC Voltage : ", 10);
	handleVolt(10);
    PIEchangeInputSlider("AC Freq.(Hz) : ", 0.5);
	handleFq(0.5);
	PIEchangeInputSlider("Inductor : ", 10);
	handleInd(10);
    PIEchangeInputSlider("Resistor : ", 10);
	handleReg(10);
	PIEchangeInputSlider("Capacitance : ", 100);
	handlecapi(100);
	PIEupdateTableRow(1,[voltage,reg,ind,farad,vr,vl,vc,ti]); 
    kain =0;
	kain1=0; kain2 = 0; kain3 = 0; kain4 = 0; kain5 = 0; kain6 = 0; kain7=0;
	battery.position.set(6,5.5,0);
	//battery.rotation.z = 0;
	//battery2.position.set(6,6,0);
	//battery2.rotation.z = 0;
	bulb.position.set(6, -4, 0);
	wired.position.set(11,-7.5,0);
	Ammeter.position.set(6,0.5,0);
	vmeter.position.set(11,0.5,0);
	mount.position.set(5.5,-8.5,0);
	plate1.position.set(10.5,5,0);
	resistor.position.set(11,-8.5,0);
	coil.position.set(11,-4.5,0);
	
	//showClockArrows();
    
    PIErender(); 
}
var plus1,plus2,sub,vl=0,vr=0,vc=0,ic=0;
function capsign()
{   //setElectronPosi();
	geometry = new THREE.BoxGeometry(0.05,0.5,0.5);
	material = new THREE.MeshBasicMaterial({color: 0xff0000 });
	plus1 = new THREE.Mesh(geometry,material);
	PIEaddElement(plus1);
	plus1.position.set(-5.5,-6.5,0);
	plus1.rotation.z = Math.PI/2;
	plus2 = new THREE.Mesh(geometry,material);
	if(s==0) { plus2.position.set(-5.5,-6.5,0);}
	if(h==0) {  plus2.position.set(-2.5,-6.5,0);}
	PIEaddElement(plus2);
	sub = new THREE.Mesh(geometry,material);
	PIEaddElement(sub);
	sub.position.set(-2.5,-6.5,0);
	sub.rotation.z = Math.PI/2;
	if(fq >0.1 && fq <= 0.5){ scalar = 0.4; }
	else if(fq >0.5 && fq<=1.3){ scalar = 0.7; }
	else if(fq>1.3 && fq<=2.0){ scalar = 1.0; }
	PIErender();
}
function sets()
{   if(reg <=30)
    {
	if(voltage <=20){ bulb.material.opacity = 0.2;
	                 
                    for(var i=0;i<7;i++)
					{ line[i].material.opacity = 0.2; } s=8;}
	else if( voltage>20 && voltage <= 45) { bulb.material.opacity = 0.5;
	                                        for(var i=0;i<7;i++)
					                       { line[i].material.opacity = 0.5; } 
									          s=12;}
	else if( voltage>45 && voltage <= 70) { bulb.material.opacity = 0.7;
                                            for(var i=0;i<7;i++)
					                      { line[i].material.opacity = 0.7; }
				                             s=17;}
	else { bulb.material.opacity = 1.0;
           for(var i=0;i<7;i++)
		  { line[i].material.opacity = 1.0; }
  		    s=23;} 
	}
	else{
		if(voltage <=20){ bulb.material.opacity = 0.1;
                          for(var i=0;i<7;i++)
					   { line[i].material.opacity = 0.2; }	
          				   s=4;}
	    else if( voltage>20 && voltage <= 45) { bulb.material.opacity = 0.3; 
		                                        for(var i=0;i<7;i++)
					                          { line[i].material.opacity = 0.6; }
				                                 s=9;}
		else if( voltage>45 && voltage <= 70) { bulb.material.opacity = 0.6; 
		                                        for(var i=0;i<7;i++)
				                           	{  line[i].material.opacity = 0.6; }
				                               s=13;}
	    else { bulb.material.opacity = 0.8; 
		       for(var i=0;i<7;i++)
			 { line[i].material.opacity = 0.8; }
			   s=17;}
	
	}
	PIErender();
}
function seth()
{   if(reg <=30)
    {
	if(voltage <=20){ bulb.material.opacity = 0.2;
	                 
                    for(var i=0;i<7;i++)
					{ line[i].material.opacity = 0.2; } h=8;}
	else if( voltage>20 && voltage <= 45) { bulb.material.opacity = 0.5;
	                                        for(var i=0;i<7;i++)
					                       { line[i].material.opacity = 0.5; } 
									        h=12;}
	else if( voltage>45 && voltage <= 70) { bulb.material.opacity = 0.7;
                                            for(var i=0;i<7;i++)
					                      { line[i].material.opacity = 0.7; }
				                           h=17;}
	else { bulb.material.opacity = 1.0;
           for(var i=0;i<7;i++)
		  { line[i].material.opacity = 1.0; }
  		  h=23;} 
	}
	else{
		if(voltage <=20){ bulb.material.opacity = 0.1;
                          for(var i=0;i<7;i++)
					   { line[i].material.opacity = 0.2; }	
          				h=4;}
	    else if( voltage>20 && voltage <= 45) { bulb.material.opacity = 0.3; 
		                                        for(var i=0;i<7;i++)
					                          { line[i].material.opacity = 0.6; }
				                                h=9;}
		else if( voltage>45 && voltage <= 70) { bulb.material.opacity = 0.6; 
		                                        for(var i=0;i<7;i++)
				                           	{  line[i].material.opacity = 0.6; }
				                             h=13;}
	    else { bulb.material.opacity = 0.8; 
		       for(var i=0;i<7;i++)
			 { line[i].material.opacity = 0.8; }
			   h=17;}
	
	}
	PIErender();
	
}

var scalar=0.1;
var ai=0,vc=0,ts,ti=0;
var j=0,s,h,ic;
var z=0,xl=0,xc=0; k1 =0;

 function updateExperimentElements(t, dt)
 {   
   if(fq != 0){
	 ts = t/1000;
	 PIEchangeDisplayText("Time(s)",ts);
    if(kain1==1 && kain2==1 && kain3==1 && kain4==1 && kain5==1 && kain6==1 && kain7==1){
	//clockwise 
	k1=1;
     if(s>=0){
	      s--; 
	 	  if(s==0){  seth();
            		PIEremoveElement(plus1);
                    PIEremoveElement(plus2);
                    PIEremoveElement(sub); capsign();}
					if(fq<=1)
		            {bulb.material.opacity -= 0.04;
					for(var i=0;i<7;i++)
					{ line[i].material.opacity -=0.04; }}
				    else if(fq>1 && fq<=1.5){
						bulb.material.opacity -= 0.02;
					for(var i=0;i<7;i++)
					{ line[i].material.opacity -=0.02; }}
				    else{
						bulb.material.opacity -= 0.01;
					for(var i=0;i<7;i++)
					{ line[i].material.opacity -=0.01; }}
					
	    if(e==1){
        for(j=0;j<48;j++){
    	var posx = electron[j].position.x;
   		var posy = electron[j].position.y;
        //  here
   		if((parseInt(posy) == -6) && (-17<posx) && (posx<=-1)){
    		electron[j].position.set(posx-0.1*scalar,-6,0);      //lower e-
    	}
    	else if((parseInt(posx) == -17) && (-6<=posy) && (posy<4)){
            electron[j].position.set(-17,posy+0.1*scalar,0);   // left 
		}
        else if((parseInt(posx) == -1) && (-6<posy) && (posy<=4)){
			electron[j].position.set(-1,posy-0.1*scalar,0);    //right
		}
        else if((-17<=posx) && (posx<-1) && (parseInt(posy) == 4)){
            electron[j].position.set(posx+0.1*scalar,4,0);        //upper
		 }
		
	  }
		}
	       if(c==1){ 
		   showAntiArrows(); 
		   }
		}
		//anticlockwise
      else if(h>=0){
	      h--; 
		  if(h==0)
		 {   sets();
			 PIEremoveElement(plus1);
             PIEremoveElement(plus2);
             PIEremoveElement(sub);		 
			 capsign(); 
			 setElectronPosi();}
				       if(fq<=1)
		            {bulb.material.opacity -= 0.04;
					for(var i=0;i<7;i++)
					{ line[i].material.opacity -=0.04; }}
				   else if(fq>1&&fq<=1.5)
				    { bulb.material.opacity -= 0.02;
					for(var i=0;i<7;i++)
					{ line[i].material.opacity -=0.02; }}
				    else{
						bulb.material.opacity -= 0.01;
					for(var i=0;i<7;i++)
					{ line[i].material.opacity -=0.01; }}
					
		if(e==1){	 
        for(j=0;j<48;j++){
    	var posx = electron[j].position.x;
   		var posy = electron[j].position.y;
        //  here
   		if((parseInt(posy) == -6) && (-17<=posx) && (posx<=-1.1)){
    		electron[j].position.set(posx+0.1*scalar,-6,0);      //lower e-
    	}
    	else if((parseInt(posx) == -17) && (-6<posy) && (posy<=4)){
            electron[j].position.set(-17,posy-0.1*scalar,0);   // left 
		}
        else if((parseInt(posx) == -1) && (-6<=posy) && (posy<4)){
			electron[j].position.set(-1,posy+0.1*scalar,0);    //right
		}
        else if((-17<posx) && (posx<=-1) && (parseInt(posy) == 4)){
            electron[j].position.set(posx-0.1*scalar,4,0);        //upper
		 }
	}
		}
	else if(c==1){
		 showClockArrows();
	}
		} 
	
	xl = 2*Math.PI*fq*ind;
	xc = 1000000/(2*Math.PI*fq*farad);
	z =  Math.sqrt(reg*reg +(xl-xc)*(xl-xc));
	ic= voltage/(z+5);
   }
    PIEupdateTableRow(1,[voltage,reg,ind,farad,vr,vl,vc,ti]); 
	vmText();
	AmText();
	PIErender();
	
	}
  }
 