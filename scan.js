/** @param {NS} ns **/
export async function main(ns) {

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
        ns.tprint(result[i]);
    }
}