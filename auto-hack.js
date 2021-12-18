/** @param {NS} ns **/
export async function main(ns) {

    if (ns.args[0] == null) {
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
              
            //HACK----------
            
            var target = result[i];
            var ram = ns.getServerMaxRam(target) / ns.getScriptRam("hack.js"); //Importent
            var ram = Math.floor(ram);

            if (ns.getServerMoneyAvailable(target) < 5000) {
                //contionue
            }else {

            
                var count = 0;
                if (ns.fileExists("BruteSSH.exe")) {
                    ns.brutessh(target);
                    count++;
                }
                if (ns.fileExists("FTPCrack.exe")) {
                    ns.ftpcrack(target);
                    count++;
                }
                
                if (ns.getServerNumPortsRequired(target) <= count && ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target) && target != "home") {
                    ns.nuke(target);
                    await ns.scp("hack.js", target); //Importent
                    
                    if (ns.isRunning("hack.js", target)){ //Importent
                        ns.kill("hack.js", target); //Importent
                    }
                    ns.exec("hack.js", target, ram); //Importent
                    ns.tprint("Success: " + target);
                    count = 0
                    
                }
            }
        }    
        
        //args
    }else {
        var target = ns.args[0];
        var ram = ns.getServerMaxRam(target) / ns.getScriptRam("hack.js");
        var ram = Math.floor(ram);

        var count = 0;
        if (ns.fileExists("BruteSSH.exe")) {
            ns.brutessh(target);
            count++;
        }
        if (ns.fileExists("FTPCrack.exe")) {
            ns.ftpcrack(target);
            count++;
        }
        
        if (ns.getServerNumPortsRequired(target) <= count && ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target)) {
            ns.nuke(target);
            await ns.scp("hack.js", target);
            ns.exec("hack.js", target, ram)
            ns.tprint("Success: " + target)
            count = 0
        }
    }
}