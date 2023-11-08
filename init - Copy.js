let xdiv;


function setup() {
    xdiv = createDiv(""); 
    xdiv.position(60, 10);  
    xdiv.style('font-size', '9px'); 
    xdiv.style('color', 'black');
demo();
}



function demo()
{
ss = `

 <input  id='agdate' type="month"  value="2020-01">
<button onclick="hello(    
    $('#agdate').val()) ">hello man </button>
`
xdiv.html(ss);
xdiv.position(60, 10);
xdiv.style('font-size', '9px');
xdiv.style('color', 'black');


}

//divprint(xdiv.elt.innerHTML)

exec = Report

function hello(mmyy) {
    aagm = [{ m: 2 }, { m: 2 }, { m: 2 }, { m: 0 }]
    //aagm = [{ m: 1 }, { m: 1 }, { m: 1 },{ m: 1 }, { m: 1 }, { m: 1 }, { m: 0 }]

    const monthName = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov"];

    var yymm = mmyy.substring(0, 4) + mmyy.substring(5, 7)

    function YY(date_) {
        return date_.substring(6, 8)
    }

    function YM(date_) {
        return date_.substring(6, 10) + date_.substring(0, 2)
    }

    function YMD(date_) {
        return date_.substring(6, 10) + date_.substring(0, 2) + date_.substring(3, 5)
    }

    function strYYMM(ym) {
        return ym.substring(2, 4) + "/" + ym.substring(4, 7)
    }

    function YYMM2M(ym) {
        // console.log("ym:" + ym)
        // console.log("strym:" + YM(ym))
        md = YM(ym)
        // console.log("yy:" + md.substring(2, 4))
        //  console.log("mm:" + md.substring(4, 6))
        //console.log(md.substring(2, 4) + "^^^" + md.substring(4, 6))
        mms = parseInt(md.substring(2, 4)) * 12 + parseInt(md.substring(4, 6))
        return mms
    }

    function MStoY(m) {
        return floor(m / 12)
    }

    function MStoM(m) {
        return m % 12
    }

    function getMMYY(my) {
        imm = parseInt(my)
        iyy = MStoY(aagm[j].startMonth)
        if (imm == 0)
            iyy -= 1

        return monthName[parseInt(imm)] + "\'" + iyy
    }

    csi_ = csi.sort(function (a, b) {
        if (a["Customer Name"] + YMD(a["Invoice Date"]) < b["Customer Name"] + YMD(b["Invoice Date"])) {
            return -1;
        }
        if (a["Customer Name"] + YMD(a["Invoice Date"]) > b["Customer Name"] + YMD(b["Invoice Date"])) {
            return 1;
        }
        return 0;
    });



    ttm = 0; // total aging month

    for (aa in aagm) {
        ttm += parseInt(aagm[aa].m);
    }

    endMonth = parseInt(yymm.substring(2, 4)) * 12 + parseInt(yymm.substring(4, 7))

    let startMonth = endMonth - ttm + 1

    sm = startMonth
    for (j = 0; j < aagm.length; j++) {
        aagm[j].startMonth = sm
        aagm[j].endMonth = sm + aagm[j].m - 1
        sm += aagm[j].m
        if (aagm[j].m == 0) {
            aagm[j].startMonth = 0
            aagm[j].endMonth = startMonth
        }
    }

    console.log("aagm===================")
    console.log(aagm);
    // printing start

    ss = `<center>MAKIN JUTA SDN BHD</center>
<center>DEBTOR SYSTEM</center>
<center>AGING DETAIL REPORT GROUP BY DOCUMENT DATE</center>
<center>AGING DATE REPORT ` + mmyy + ` (LOCAL CURRENCY WITH TRANSACTION DATE)</center>`

    //ss += "<img src='csilogo2.png'>"
    ss += "<table>";

    //** Detail *********************
    oldname = "";
    for (j = 0; j < aagm.length; j++) { aagm[j].amount = 0 }
    for (ln in csi_) {
        ll = "";
        lln = csi_[ln]
        yymm_ = YM(lln["Invoice Date"])
        InvoiceMonths = YYMM2M(lln["Invoice Date"])

        // Filter by date
        if (yymm_ <= yymm) {
            if (oldname != csi_[ln]["Customer Name"]) {
                if (oldname != "") {
                    mobj = doAging(ss, aagm)
                    ss = mobj.ss1
                    aagm = mobj.aagm
                }
                //----group header
                ss += "<tr><td colspan='4' ><table ><tr><td ><h3>" + csi_[ln]["Customer"] + "<h3></td>" + "<td><h3>" + csi_[ln]["Customer Name"] + "<h3></td></tr></table></td></tr>"

                oldname = lln["Customer Name"];

                //** header
                cols = 0;
                ss += `<tr bgcolor="#ddddcd">`
                //      for (cn in csi[0]) {
                //
                //         if (cn == 'Invoice' || cn == 'Amount' || cn == 'Invoice Date' || cn == 'Due/Payment Date' || cn == 'Salesperson' || cn == 'Currency' || cn == 'Terms Code')
                //           ss += `<th>` + cn + "</th>"
                //     }

                ss += `<th>Group</th>`
                ss += `<th>Phone</th>`
                ss += `<th>Salesperson</th>`
                ss += `<th>Doc No</th>`
                ss += `<th>Doc Date</th>`
                ss += `<th>Doc Type</th>`



                // print aging extention
                for (j = aagm.length - 1; j >= 0; j--) {
                    if (aagm[j].m == 0)
                        ss += "<td> > " + monthName[MStoM(startMonth)] + "\'" + MStoY(startMonth) + "</td>"
                    //   ss1 += "<th bgcolor='#ddddda'> > " + strYYMM(yymm) + "</th>"
                    else {
                        let sst = MStoM(aagm[j].startMonth)
                        let sse = MStoM(aagm[j].endMonth)
                        if (sst == sse)
                            ss += "<td bgcolor='#ddddde'>" + getMMYY(sst, aagm) + "</td>"
                        else {

                            ss += "<td bgcolor='#dddddf'>" + getMMYY(sst, aagm) + "-" + getMMYY(sse, aagm) + "</td>"
                        }
                        // + sst +  "=" + sse + ":" + aagm[j].startMonth + "---" + aagm[j].endMonth + "</td>"

                    }
                }

                ss += "</tr>"
            }

            //place value into basket *****************
            for (j = 0; j < aagm.length; j++) {
                if (aagm[j].m == 0) {
                    if (InvoiceMonths <= startMonth) {
                        //console.log("invoiceMonths:" + InvoiceMonths);
                        //console.log("startMonth:" + aagm[j].startMonth);
                        //console.log("Ïnvoice Date" + lln['Invoice Date']);

                        aagm[j].amount += parseInt(lln["Amount"])
                        console.log("InvoiceMonths:" + InvoiceMonths + ",Ïnv Date:" + lln["Invoice Date"] + ",Ïnvoice:" + lln["Invoice"] + ",ag=" + aagm[aagm.length - 1].startMonth + "amount:" + aagm[j].amount)
                        console.log(aagm);
                    }
                }
                else {
                    if (InvoiceMonths >= aagm[j].startMonth && InvoiceMonths <= aagm[j].endMonth) {
                        aagm[j].amount += parseInt(lln["Amount"])
                    }
                }
            }

            //     for (cn in lln) {
            //ss += `<th>Group</th>"
            //ss += `<th>Phone</th>"
            //ss += `<th>Salesperson</th>"
            //ss += `<th>Doc No</th>"
            //ss += `<th>Doc Date</th>"
            //ss += `<th>Doc Type</th>"

            //            if (cn == 'Invoice' || cn == 'Amount' || cn == 'Invoice Date' || cn == 'Due/Payment Date' || cn == 'Salesperson' || cn == 'Currency' || cn == 'Terms Code')
            //{
            //cols ++;
            //                ll += "<td>" + lln[cn] + "</td>"
            //}

            ll += "<td>" + lln['Customer'] + "</td>"
            ll += "<td>" + lln['Phone'] + "</td>"
            ll += "<td>" + lln['Customer'] + "</td>"
            ll += "<td>" + lln['Invoice'] + "</td>"
            ll += "<td>" + lln['Invoice Date'] + "</td>"
            ll += "<td>" + lln['Transaction Type'] + "</td>"


            //   }


            // line aging ************
            for (j = aagm.length - 1; j >= 0; j--) {
                console.log("-----------------------------");
                console.log(YYMM2M(lln['Invoice Date']));
                console.log(aagm[j].startMonth);
                console.log(aagm[j].endMonth);

                if ((YYMM2M(lln['Invoice Date']) >= aagm[j].startMonth) && (YYMM2M(lln['Invoice Date']) <= aagm[j].endMonth))
                    ll += "<td>" + parseInt(lln['Amount']).toFixed(2) + "</td>"
                else
                    ll += "<td></td>"
            }
            ss += "<tr>" + ll + "</tr>"
        }


    }
    mobj = doAging(ss, aagm)
    ss = mobj.ss1
    aagm = mobj.aagm
    ss += "</table>"


    // background('green'); 


    // Use html() function 
    xdiv.html(ss);
    xdiv.position(60, 10);
    xdiv.style('font-size', '9px');
    xdiv.style('color', 'black');

    ss = "";
    divprint(xdiv.elt.innerHTML)


    function doAging(ss1, aagm) {



        ss1 += "<tr>"
        ss1 += "<td></td>"
        ss1 += "<td></td>"
        ss1 += "<td></td>"
        ss1 += "<td></td>"
        ss1 += "<td></td>"
        ss1 += "<td></td>"
        for (j = aagm.length - 1; j >= 0; j--) {
            ss1 += "<td>" + aagm[j].amount.toFixed(2) + "</td>"
        }

        for (j = aagm.length - 1; j >= 0; j--) {
            aagm[j].amount = 0
        }
        ss1 += "</tr>"
        return { ss1, aagm }
    };
}