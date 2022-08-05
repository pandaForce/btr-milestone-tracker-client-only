const res = {'result' : {}, 'max_tranche_value' : 0 , 'excel_data_prep': []}
const tranche_data_template = {'totallots': 1, 'pctglots': 0,'cumulativelots': 0, 'cumulativepctg': 0}

const  extractDataForConcentrationReport = (stockdata) => {
    console.log('inside extractDataForConcentrationReport stockdata.length: ' + stockdata.length)
    const stockdataGrouped = stockdata.reduce( (prev_val,e) => (  
        // const stockdataGrouped = stockdata.reduce( ([],e) => (  
        // result[e.Project__r.Name] = result[e.Project__r.Name] ? result[e.Project__r.Name] : {},
        // result[e.Project__r.Name][e.Stage__r.Name] = result[e.Project__r.Name][e.Stage__r.Name] ? result[e.Project__r.Name][e.Stage__r.Name] : {},    
        // result[e.Project__r.Name][e.Stage__r.Name][e.Trancher__c] = result[e.Project__r.Name][e.Stage__r.Name][e.Trancher__c] ? result[e.Project__r.Name][e.Stage__r.Name][e.Trancher__c] + 1 : 1
        res['result'][e.Project__r.Name] = res['result'][e.Project__r.Name] ? res['result'][e.Project__r.Name] : {},
        res['result'][e.Project__r.Name][e.Stage__r.Name] = res['result'][e.Project__r.Name][e.Stage__r.Name] ? res['result'][e.Project__r.Name][e.Stage__r.Name] : {},    
        res['result'][e.Project__r.Name][e.Stage__r.Name][e.Trancher__c] = res['result'][e.Project__r.Name][e.Stage__r.Name][e.Trancher__c] ? res['result'][e.Project__r.Name][e.Stage__r.Name][e.Trancher__c] + 1 : 1,

        res['max_tranche_value'] = e.Trancher__c > res['max_tranche_value']  ?  e.Trancher__c : res['max_tranche_value'],

        res['excel_data_prep'].find((d) => d.projectname === e.Project__r.Name) 
        ?
        // null
            stageFound(res['excel_data_prep'].find((d) => d.projectname === e.Project__r.Name).projectdata.find((x) => x.stagename === e.Stage__r.Name))
            ? 
            // null
                    res['excel_data_prep'].find((d) => d.projectname === e.Project__r.Name).projectdata.find((x) => x.stagename === e.Stage__r.Name).stagedata.find((x) => x.tranchename === e.Trancher__c)
                ?
                res['excel_data_prep'].find((d) => d.projectname === e.Project__r.Name).projectdata.find((x) => x.stagename === e.Stage__r.Name).stagedata.find((x) => x.tranchename === e.Trancher__c).tranchedata.totallots++
                :
                res['excel_data_prep'].find((d) => d.projectname === e.Project__r.Name).projectdata.find((x) => x.stagename === e.Stage__r.Name).stagedata.push({'tranchename' : e.Trancher__c,'tranchedata' : {...tranche_data_template}})
            :
            res['excel_data_prep'].find((d) => d.projectname === e.Project__r.Name).projectdata.push(firstPush('stage',null,  e.Stage__r.Name, e.Trancher__c))
        :    
        res['excel_data_prep'].push(firstPush('project', e.Project__r.Name, e.Stage__r.Name, e.Trancher__c))


        // res['excel_data_prep'].find((d) => d.stagename === e.Stage__r.Name) 
        // ? 
        //     res['excel_data_prep'].find((d) => d.stagename === e.Stage__r.Name).stagedata.find((x) => x.tranchename === e.Trancher__c)
        //     ?
        //         res['excel_data_prep'].find((d) => d.stagename === e.Stage__r.Name).stagedata.find((x) => x.tranchename === e.Trancher__c).tranchedata.totallots++
        //     :
        //         res['excel_data_prep'].find((d) => d.stagename === e.Stage__r.Name).stagedata.push({'tranchename' : e.Trancher__c,'tranchedata' : {...tranche_data_template}})
        // :
        //     res['excel_data_prep'].push(firstPush('stage',null,  e.Stage__r.Name, e.Trancher__c))

            ,
        res), {})
    
        // console.log('res.result: '  + JSON.stringify(res.result))
        // console.log('res.excel_data_prep: '  + JSON.stringify(res.excel_data_prep))

        // console.log('stockdataGrouped.excel_data_prep: '  + JSON.stringify(stockdataGrouped.excel_data_prep))

    // const excel_data_final = finalizeExcelData(res.excel_data_prep)
    // console.log('excel_data_final: '  + JSON.stringify(excel_data_final))
        return {'groupeddaata' : stockdataGrouped.excel_data_prep , 'maxtranches' : res['max_tranche_value']}
}

const firstPush = (type, proj, stg, trnch) => {
    // console.log('type: '+ type)
    let temp_array = [] 
    let temp_obj = {}
    let temp_obj_proj = {}

    temp_array.push({'tranchename' : trnch,'tranchedata' : {...tranche_data_template}})
    temp_obj = {'stagename' :stg, 'stagedata': [...temp_array]}

    if(type=='project') {
        let temp_array_proj = [] 
        let temp_array_stg = []
        // temp_array_stg.push(temp_obj)
        // temp_array_proj.push({'stagename' : stg,'stagedata' : {...temp_obj}})
        // temp_array_proj.push({'stagename' : stg,'stagedata' : [...temp_array_stg]})
        temp_array_proj.push({'stagename' : stg,'stagedata' : [...temp_array]})
        temp_obj_proj = {'projectname' :proj, 'projectdata': [...temp_array_proj]}
    } 
    const return_obj = type=='project' ? {...temp_obj_proj} :  {...temp_obj}
    // console.log('return_obj: ' + JSON.stringify(return_obj))
    return return_obj
}

const stageFound = (a) => {
    const stg_found = a ?  true : false
    return stg_found
}

export default extractDataForConcentrationReport
