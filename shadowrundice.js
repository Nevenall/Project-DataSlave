on("chat:message", function(msg) {
	if(msg.type === "api" && msg.content.indexOf("!shadowtest") !== -1) {
		var msgtext = msg.content.slice(msg.content.indexOf(" ")+1).trim();
		options = msgtext.split("|");
		if(options.length != 6) { sendChat("Shadow Test Roller","/w "+msg.who.replace(" (GM)","")+" Dice Roll Error. Expected 6 values, received "+msgtext+" Please report this error to EtoileLion."); return; }
		options[0] = parseInt(options[0]);
		options[1] = parseInt(options[1]);
		options[2] = parseInt(options[2]);
		var total = 0;
		var fails = 0;
		var dievalue = 0;
		var dieresults = [];
		log(options.slice(0,3).join(","));
		// Special: If modifier Negative.
		if(options[2] < 0) {
			let negmod = options[2];
			options[2] = 0;
			options[1] += negmod;
			if(options[1] < 0) {
				options[0] += options[1];
				options[1] = 0;
			}			
		}
		options.slice(0,3).forEach(function(toroll) {
		var rolled = 0;
		while (rolled < toroll) {
			dievalue = randomInteger(6);
			if (dievalue >= 5) { total++; }
			if (dievalue == 1) { fails++; }
			dieresults.push("<span class=\""+((dievalue >= 5) ? " sheet-critdie" : "")+((dievalue === 1) ? " sheet-cfaildie" : "")+"\">"+dievalue+"</span>");
			rolled++;
		}
		});
		var output = "&{template:shadowtest} {{name="+options[5]+"}} {{dierow="+dieresults.join(",")+"}} {{table="+((fails > ((options[0]+options[1]+options[2])/2)) ? ((total == 0) ? "critglitchedtest" : "glitchedtest") : ((total == 0) ? "failedtest" : "passedtest"))+"}} {{total="+total+"}} {{attr="+options[3]+"}} "+((options[2] > 0) ? " {{modifier=1}}" : "")+((options[1] > 0) ? " {{skill="+options[4]+"}}" : "");
		log(output);
		//var output = "<div class=\"sheet-rollresult-shadowtest "+((fails > ((options[0]+options[1]+options[2])/2)) ? ((total == 0) ? "sheet-rollresult-critfailedtest" : "sheet-rollresult-failedtest") : "")+"\"><div class=\"sheet-rollresult-namerow\">"+options[5]+"</div><div class=\"sheet-rollresult-byline\">("+options[3]+((options[1] > 0) ? "+"+options[4] : "")+((options[2] > 0) ? "+Modifier" : "")+")</div><div class=\"sheet-rollresult-dieline\">"+dieresults.join(",")+"</div><div class=\"sheet-rollresult-total\">"+total+" hits</div><div class=\"sheet-rollresult-critfailrow\">Critical Glitch</div></div>";
			sendChat(options[5],output);
	}
});