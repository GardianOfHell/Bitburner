/** @param {NS} ns **/
export async function main(ns) {
    //ns.disableLog("ALL");
    var target = ns.getHostname();
    var money = ns.getServerMaxMoney(target) * 0.75;
    var security = ns.getServerMinSecurityLevel(target) + 5;
    var available = ns.getServerMoneyAvailable(target);

    while(true) {
        await ns.sleep(500);
        if (ns.getServerSecurityLevel(target) > security) {
            await ns.weaken(target);
        }else if (available < money) {
            await ns.grow(target);
        }else {
            await ns.hack(target)
        }
	}
}