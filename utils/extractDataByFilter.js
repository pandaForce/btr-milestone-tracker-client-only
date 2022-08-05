import IsSettlementCalledUp from './IsSettlementCalledUp'
import calculateCompletePctg from './calculateCompletePctg'

const extractDataByFilter = (stockdata,params,filtercategory) => {
  console.log('inside extractDataByFilter : params ' + params + ' | filtercategory: '+ filtercategory)
  const stockdataFiltered_for_null =stockdata.filter(a  => a[params[0]]  !== null  && a[params[0]]  !== undefined )     
  const stockdataFiltered =stockdataFiltered_for_null.filter(a  => a.ProductType__c !== 'House and Land' )     
  const result = 
    params.length > 3 ? 
      stockdataFiltered.reduce( (acc, o) => (acc[o[params[0]][params[1]][params[2]]] = ( {sfid: o[params[3]],count: acc[o[params[0]][params[1]][params[2]]] ? acc[o[params[0]][params[1]][params[2]]].count+1: 1,totalprice: acc[o[params[0]]] ? acc[o[params[0]]].totalprice+o.Price__c : o.Price__c,totalsize: acc[o[params[0]]] ? acc[o[params[0]]].totalsize+o.LandSize_r__c : o.LandSize_r__c}) , acc), {}) 
    :  params.length > 2 ? 
      stockdataFiltered.reduce( (acc, o) => (acc[o[params[0]][params[1]]] = ( {sfid: o[params[2]],count: acc[o[params[0]][params[1]]] ? acc[o[params[0]][params[1]]].count+1: 1,totalprice: acc[o[params[0]]] ? acc[o[params[0]]].totalprice+o.Price__c : o.Price__c,totalsize: acc[o[params[0]]] ? acc[o[params[0]]].totalsize+o.LandSize_r__c : o.LandSize_r__c}) , acc), {}) 
     : filtercategory === 'lot' ? 
    //  stockdataFiltered.reduce( (acc, o) => (acc[o[params[0]]] = {sfid: null, count: acc[o[params[0]]] ? acc[o[params[0]]].count+1 : 1, status: o.StatusDevr__c, price: o.Price__c, allocgrp: o.AllocationGroup__c, projname:o.Project__r ? o.Project__r.Name : '', stage:o.Stage__r ? o.Stage__r.Name : '', lateststage:o.LatestMasterContract__r ? o.LatestMasterContract__r.ContractLifecycle__r ? o.LatestMasterContract__r.ContractLifecycle__r.Latest_Stage__c : '': ''} , acc), {})
     stockdataFiltered.reduce( (acc, o) => (acc[o[params[0]]] = {sfid: null, count: acc[o[params[0]]] ? acc[o[params[0]]].count+1 : 1, status: o.StatusDevr__c, price: o.Price__c, allocgrp: o.AllocationGroup__c, projname:o.Project__r ? o.Project__r.Name : '', stage:o.Stage__r ? o.Stage__r.Name : '', lateststage:o.Milestone__c, tranche:o.Trancher__c } , acc), {})
    //  : stockdataFiltered.reduce( (acc, o) => (acc[o[params[0]]] = {sfid: null, count: acc[o[params[0]]] ? acc[o[params[0]]].count+1 : 1, totalprice: acc[o[params[0]]] ? acc[o[params[0]]].totalprice+o.Price__c : o.Price__c,totalsize: acc[o[params[0]]] ? acc[o[params[0]]].totalsize+o.LandSize_r__c : o.LandSize_r__c} , acc), {})
     : stockdataFiltered.reduce( (acc, o) => (acc[o[params[0]]] = 
        acc[o[params[0]]] ?
        {
          sfid: acc[o[params[0]]].sfid,
          // tranche: acc[o[params[0]]].tranche,
          count: acc[o[params[0]]].count + 1, 
          totalprice: acc[o[params[0]]].totalprice + o.Price__c,
          totalsize: acc[o[params[0]]].totalsize + o.LandSize_r__c ,
          landsettled: o.StatusDevr__c=='Settled' ? acc[o[params[0]]].landsettled+1 : acc[o[params[0]]].landsettled,
          settlementclaimdone: IsSettlementCalledUp(o.Milestone__c) ? acc[o[params[0]]].settlementclaimdone + 1: acc[o[params[0]]].settlementclaimdone,
          leased: o.Milestone__c=='Leased' ? acc[o[params[0]]].leased+1 : acc[o[params[0]]].leased,
          // completepctg:  calculateCompletePctg(acc[o[params[0]]].completepctg, o.StatusDevr__c,o.Milestone__c) ,
          completepctg: 
            ( calculateCompletePctg(o.StatusDevr__c,o.Milestone__c)  + acc[o[params[0]]].completepctg ),
      }  :
      {
        sfid: null,
        // tranche: o.Trancher__c,
        count: 1, 
        totalprice:  o.Price__c,
        totalsize: o.LandSize_r__c,
        landsettled: o.StatusDevr__c=='Settled' ? 1 : 0,
        settlementclaimdone: IsSettlementCalledUp(o.Milestone__c) ?  1: 0,
        leased: o.Milestone__c=='Leased' ? 1 : 0,
        completepctg:  calculateCompletePctg(o.StatusDevr__c,o.Milestone__c),
      } , acc), {})

    const tempArray = []
    for (const [key, value] of Object.entries(result)) {
      if (filtercategory === 'lot' ) {
        tempArray.push({id:key+Math.random()*Math.random(), name: key, count: value.count, sfid:value.sfid,  status:value.status, price: value.price, allocgrp: value.allocgrp, projname: value.projname, stage: value.stage, lateststage: value.lateststage, tranche: value.tranche,completepctg:  calculateCompletePctg(value.status, value.lateststage), })
      } else {
        tempArray.push({id:key+Math.random()*Math.random(), name: key, count: value.count, sfid: value.sfid, totalprice: value.totalprice, totalsize: value.totalsize, landsettled: value.landsettled, settlementclaimdone: value.settlementclaimdone, leased: value.leased, completepctg: value.completepctg})
      }
    }
      return tempArray
}
export default extractDataByFilter