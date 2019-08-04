on("chat:message", function(msg) {
	if(msg.type === "api" && msg.content.indexOf("!shadowtest") !== -1) {
		var msgtext = msg.content.slice(msg.content.indexOf(" ")+1).trim();
		options = msgtext.split("|");
		if(options.length < 6) { sendChat("Shadow Test Roller","/w "+msg.who.replace(" (GM)","")+" Dice Roll Error. Expected 6 values, received "+msgtext+" Please report this error to EtoileLion."); return; }
		log(options)
		log(msg.inlinerolls[0])
		options[0] = parseInt(options[0]);
		options[1] = parseInt(options[1]);
		options[2] = msg.inlinerolls[0].results.total;
		var total = 0;
		var fails = 0;
		var dievalue = 0;
		var dieresults = [];
		// Special: Deny Untrained Skill
		if(options[1] == 0 && options.length == 7 && options[6] == "N") {
			sendChat(options[5],"Attempted to make a untrained skill test with a skill that does not allow untrained skill tests.");
			return;
		}
		// Special: Untrained Skill
		if(options[1] == 0 && options.length == 7 && options[6] == "Y") {
			options[2] -= 1;
		}
		// Special: Spec Skill
		if(options.length == 7 && options[6] != "Y" && options[6] != "N") {
		    options[1] += parseInt(options[6])
		}
		log(options)
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
		log(options)
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
		var output = "&{template:shadowtest} {{name="+options[5]+"}} {{dierow="+dieresults.join(",")+"}} {{table="+((fails > ((options[0]+options[1]+options[2])/2)) ? ((total == 0) ? "critglitchedtest" : "glitchedtest") : ((total == 0) ? "failedtest" : "passedtest"))+"}} {{total="+total+"}} {{attr="+options[3]+"}} "+((options[2] > 0) ? " {{modifier=1}}" : "")+((options[4] != "") ? " {{skill="+options[4]+((options.length == 7 && options[6] == "Y") ? " [Untrained]" : "")+"}}" : "");
		sendChat(options[5],output);
	}
});

log("Shadowrun 6e Dice Tester v1.1 Loaded");