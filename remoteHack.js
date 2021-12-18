/** @param {NS} ns **/
export async function main(ns) {
	//ns.disableLog("ALL");
	var target = ns.args[0];
    var money = ns.getServerMaxMoney(target);
	var sec = ns.getServerMinSecurityLevel(target) + 5;
	var avaliable = ns.getServerMoneyAvailable(target);

	while (true) {
		await ns.sleep(500);
		if (ns.getServerSecurityLevel(target) > sec) {
			await ns.weaken(target);
		}else if (avaliable > money) {
			await ns.grow(target);
		}else {
			await ns.hack(target)
			ns.print(avaliable)
		}
	}
}