/** @param {NS} ns **/
export async function main(ns) {

	var target = "n00dles";
	var nextNode = "";
    var result = [];
    var server = ns.scan("home");
    
    while (server.length > 0) {
        var node = server.shift();
        if (result.includes(node)) {
            //contionue
        }else {
            result.push(node);

            var nextNode = ns.scan(node);
            for (var i = 0; i < nextNode.length; i++) {
                server.push(nextNode[i]);
            }
        }
    
    }

    for (var i = 0; i < result.length; i++) {
		await ns.sleep(500);
		var ram = 16;
		var hn = "server-";
		var ser = 25;
		
		if (ns.hasRootAccess(result[i]) && result[i] != "home"){
			var newTarget = result[i];
			if (ns.getServerMaxMoney(result[i]) > ns.getServerMaxMoney(target))
			var target = newTarget;
		}
		ns.tprint("Target: " + target);
		ns.tprint("Scaning: " + newTarget);
	}
	
	function myMoney() {
		return Math.round(ns.getServerMoneyAvailable("home"));
	}


	for (var i = 0; ns.getPurchasedServers().length < ser; i++) {
		while (ns.getPurchasedServerCost(ram) > myMoney()) {
			ns.print("Have $" + myMoney() + " Need $" + ns.getPurchasedServerCost(ram));
			await ns.sleep(30000);
		}
		ns.purchaseServer(hn + i, ram);
	}

	for (var i = 0; ns.getPurchasedServers().length > i; i++) {
		ns.killall(hn + i);
		var thr = Math.floor(ns.getServerMaxRam(hn + i) / ns.getScriptRam("remoteHack.js"));
		await ns.scp("remoteHack.js", "home", hn + i);
		ns.exec("remoteHack.js", hn + i, thr, target);
	}
	
	ns.tprint("Finised");
}