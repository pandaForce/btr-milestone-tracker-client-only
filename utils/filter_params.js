const filter_params = {
    'project': [ 'Project__r', 'Name','Project__c'],
    'stage': [ 'Stage__r', 'Name', 'Stage__c'],
    // 'group': [ 'AllocationGroup__c'],
    // 'allocation': [ 'ProductAllocatedTo__c'],
    'status': [ 'StatusDevr__c'],
    'type': [ 'ProductType__c'],
    'lot': [ 'Name'],
    'tranche' : ['Trancher__c'],
    // 'constructionstage' : ['LatestMasterContract__r','ContractLifecycle__r','Latest_Stage__c','LatestMasterContract__c']
    'milestone' : ['Milestone__c']
    // 'constructionstage' : ['LatestMasterContract__r','ContractLifecycle__r','Latest_Stage__c','Project__c']
}

export default filter_params
