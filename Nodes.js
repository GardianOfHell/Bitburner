/** @param {NS} ns **/
export async function main(ns) {
    
    function myMoney() {
    return ns.getServerMoneyAvailable("home");
	}

	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");

	var cnt = 11;
	var level = 200;
	var Ram = 32;
	var core = 8;

	while(ns.hacknet.numNodes() < cnt) {
		var res = ns.hacknet.purchaseNode();
		ns.print("Purchased hacknet Node with index " + res);
	}

	for (var i = 0; i < cnt; i++) {
		while (ns.hacknet.getNodeStats(i).level < level) {
			var cost = ns.hacknet.getLevelUpgradeCost(i, 10);
			while (myMoney() < cost) {
				ns.print("Need $" + cost + " . Have $" + myMoney());
				await ns.sleep(60000);
			}
			var res = ns.hacknet.upgradeLevel(i, 10);
		}
	}

	ns.print("All nodes upgraded to level " + level);

	for (var i = 0; i < cnt; i++) {
		while (ns.hacknet.getNodeStats(i).ram < Ram) {
			var cost = ns.hacknet.getRamUpgradeCost(i, 1);
			while (myMoney() < cost) {
				ns.print("Need $" + cost + " . Have $" + myMoney());
				await ns.sleep(60000);
			}
			var res = ns.hacknet.upgradeRam(i, 1);
		}
	}

	ns.print("All nodes upgraded to " + Ram + "GB RAM");

	for (var i = 0; i < cnt; i++) {
		while (ns.hacknet.getNodeStats(i).cores < core) {
			var cost = ns.hacknet.getCoreUpgradeCost(i, 1);
			while (myMoney() < cost) {
				ns.print("Need $" + cost + " . Have $" + myMoney());
				await ns.sleep(60000);
			}
			var res = ns.hacknet.upgradeCore(i, 1);
		}
	}

	ns.print("All nodes upgraded to " + core + " cores");
}