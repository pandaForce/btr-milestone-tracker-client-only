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
     stockdataFiltered.reduce( (acc, o) => (acc[o[params[0]]] = {sfid: o.Id, count: acc[o[params[0]]] ? acc[o[params[0]]].count+1 : 1, status: o.StatusDevr__c, price: o.Price__c, buildprice: o.LatestMasterContract__r != null ? o.LatestMasterContract__r.BuildContractPrice__c : "", propertyprice: o.LatestMasterContract__r != null ?  o.LatestMasterContract__r.PropertyContractPrice__c : "",  buildstatus: o.LatestMasterContract__r != null ? o.LatestMasterContract__r.BuildContractStatus__c : "", propertystatus: o.LatestMasterContract__r != null ? o.LatestMasterContract__r.PropertyContractStatus__c : "", landsize: o.LandSize__c , streetnumber : o.StreetNumber__c, streetname : o.StreetName__c, suburb : o.Suburb__c, state : o.State__c , postcode :o.Postcode__c , depth : o.LandDepth__c, frontage : o.LandFrontage__c, iscorner : o.IsCornerLot__c, isirregular: o.IsIrregularLot__c, volume : o.Volume__c, folio : o.FolioNo__c, municipality : o.Municipality__c, lp: o.LP__c, ps: o.PS__c, projectvendor : o.ProjectVendor__c, jobcode: o.JobCodeconsolidated__c , allocgrp: o.AllocationGroup__c, projname:o.Project__r ? o.Project__r.Name : '', stage:o.Stage__r ? o.Stage__r.Name : '', lateststage:o.Milestone__c, tranche:o.Trancher__c } , acc), {})
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
        tempArray.push({id:key+Math.random()*Math.random(), name: key, count: value.count, sfid:value.sfid,  status:value.status, price: value.price, buildprice: value.buildprice, propertyprice: value.PropertyContractPrice__c,  buildstatus: value.buildstatus, propertystatus: value.propertystatus, landsize: value.landsize, streetnumber : value.streetnumber, streetname : value.streetname, suburb : value.suburb, state : value.state , postcode :value.postcode , depth : value.depth , frontage : value.frontage, iscorner : value.iscorner, isirregular: value.isirregular, volume : value.volume, folio : value.folio, municipality : value.municipality, lp: value.lp, ps: value.ps, projectvendor : value.projectvendor, jobcode: value.jobcode, allocgrp: value.allocgrp, projname: value.projname, stage: value.stage, lateststage: value.lateststage, tranche: value.tranche,completepctg:  calculateCompletePctg(value.status, value.lateststage), })
      } else {
        tempArray.push({id:key+Math.random()*Math.random(), name: key, count: value.count, sfid: value.sfid, totalprice: value.totalprice, totalsize: value.totalsize, landsettled: value.landsettled, settlementclaimdone: value.settlementclaimdone, leased: value.leased, completepctg: value.completepctg})
      }
    }
      return tempArray
}
export default extractDataByFilter