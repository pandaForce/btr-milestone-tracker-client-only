
var stockdata_active_projects = stockdata_all_projects.filter(p => ( p.Project__c != null && p.Project__r.ActiveforReporting__c))

var stockdata = stockdata_active_projects.filter(p => ( p.ProductAllocatedTo__c=='Build To Rent'))

console.log('stockdata.length: '+ stockdata.length)

export default stockdata