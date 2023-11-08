let xdiv;


function numCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setup() {
  xdiv = createDiv("");
  xdiv.position(60, 10);
  xdiv.style("font-size", "9px");
  xdiv.style("color", "black");
  demo();
}

function demo() {
  ss = `
    <label for="fname">Report Date: </label>
 <input  id='agdate' type="month"  value="2021-01">
<br><br>
    <label for="fname">Basket: </label>
    <input type="text" id="buckets" name="fname" value="1,1,1,1,1,1"> <br><br>
    <label for="fname">Company Code: </label>
    <input type="text" id="ccode" value=""> <br><br>
    <button onclick="hello(    
        $('#agdate').val()) ">Submit</button>
`;
  xdiv.html(ss);
  xdiv.position(60, 10);
  xdiv.style("font-size", "9px");
  xdiv.style("color", "black");



}



 
 
  
//divprint(xdiv.elt.innerHTML)

//exec = Report

aagm = [];

function hello(mmyy) {
  let buckets = $("#buckets").val().split(",");
  let ccode = $("#ccode").val().trim();

  aagm.push({ m: 0 });
  for (bi in buckets) aagm.push({ m: parseInt(buckets[bi]) });

  // aagm = [{ m: 2 }, { m: 2 }, { m: 2 }, { m: 0 }]
  //  console.log('###############')
  //  console.log(aagm);
  //aagm = [{ m: 1 }, { m: 1 }, { m: 1 },{ m: 1 }, { m: 1 }, { m: 1 }, { m: 0 }]

  const monthName = [
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",

    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
  ];

  var yymm = mmyy.substring(0, 4) + mmyy.substring(5, 7);
  var today = new Date();
  var ddmmyy_ =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();


// function numberWithCommas(x) {
//       return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }

  function MStoY(m) {

   return parseInt(m/12, 10)
  }

  function MStoM(m) {
    return m % 12;
  }

  function getMMYY(my) {
    imm = parseInt(my);

    iyy = MStoY(aagm[j].startMonth);

    if (imm == 0) iyy -= 1; //-= check here

    return monthName[parseInt(imm)] + "'" + iyy;
  }

  function getMMYY2(my) {
    imm = parseInt(my);

    iyy = MStoY(aagm[j].endMonth);

   if (imm == 0) iyy -= 1; //-= check here
    return monthName[parseInt(imm)] + "'" + iyy;
  }

  let csia;
  if (page == 1 || page == 2) csia = localStorage.getItem("csidata");
  else csia = localStorage.getItem("csiCSdata");

  csi = JSON.parse(csia);
  if (ccode != "")
    var csi = csi.filter(function (el) {
      return el.Customer == ccode;
    });

  // month first
    function junk_YM(str) {
    var f = str.indexOf("/");
    var l = str.lastIndexOf("/");
    //var mm = str.substring(f+1, l);
    var mm = str.substring(0,f);
    var yy = str.substring(l+1);
    if (mm.length < 2) mm = "0" + mm;
    return yy + mm;
  }

// day first
  function YM(str) {
    var f = str.indexOf("/");
    var l = str.lastIndexOf("/");
    var mm = str.substring(f + 1, l)
    var yy = str.substring(l+1);
    if (mm.length < 2) mm = "0" + mm;
    return yy + mm;
  }
  // day first
  function YMD(str) {
    var ym = YM(str) 
    var f = str.indexOf("/");
    var dd = str.substring(0, f);
    var yy = ym.substring(0,4);
    var mm = ym.substring(4);
    if (mm.length < 2) mm = "0" + mm;
    if (dd.length < 2) dd = "0" + dd;
    return yy + mm + dd;
  }

// month first
  function YMD_junk(str) {
    var ym = YM(str) 
    var f = str.indexOf("/");
    var dd = str.substring(f + 1, l)
    var yy = ym.substring(0,4);
    var mm = ym.substring(4);
    if (mm.length < 2) mm = "0" + mm;
    if (dd.length < 2) dd = "0" + dd;
    return yy + mm + dd;
  }

  function ddmmyy(str) {
    var ym = YM(str) 
    var f = str.indexOf("/");
     var dd = str.substring(0, f);
    var yy = ym.substring(0,4);
    var mm = ym.substring(4);
    return dd + "/" + mm + "/" + yy;
  }

  function YYMM2M(str) {
    md = YM(str);
    var yy = md.substring(0, 4);
    var mm = md.substring(4);
    mms = (parseInt(yy) - 2000) * 12 + parseInt(mm);
    return mms;
  }

  //console.log(csi[1031]["Invoice"]);
  if (page < 3) {
    csi_ = csi.sort(function (a, b) {
      if (
        a["Customer Name"] + YMD(a["Invoice Date"]) <
        b["Customer Name"] + YMD(b["Invoice Date"])
      ) {
        return -1;
      }

      if (
        a["Customer Name"] + YMD(a["Invoice Date"]) >
        b["Customer Name"] + YMD(b["Invoice Date"])
      ) {
        return 1;
      }

      return 0;
    });
  } else {
    csi_ = csi.sort(function (a, b) {
      if (
        a["Customer Name"] + a["Project"] + YMD(a["Invoice Date"]) <
        b["Customer Name"] + b["Project"] + YMD(b["Invoice Date"])
      ) {
        return -1;
      }

      if (
        a["Customer Name"] + a["Project"] + YMD(a["Invoice Date"]) >
        b["Customer Name"] + b["Project"] + YMD(b["Invoice Date"])
      ) {
        return 1;
      }

      return 0;
    });
  }

  if (page == 3 || page == 4)
    for (itm in csi_) {
      csi_[itm].Amount = csi_[itm]["Invoice Outstanding Amount"].replace(",","");
    }
  ttm = 0; // total aging month

  for (aa in aagm) {
    ttm += parseInt(aagm[aa].m);
  }

  endMonth =
    parseInt(yymm.substring(2, 4)) * 12 + parseInt(yymm.substring(4, 7));

  let startMonth = endMonth - ttm + 1;
  sm = startMonth;
  for (j = 0; j < aagm.length; j++) {
    aagm[j].startMonth = sm;
    aagm[j].endMonth = sm + aagm[j].m - 1;
    sm += aagm[j].m;
    if (aagm[j].m == 0) {
      aagm[j].startMonth = 0;
      aagm[j].endMonth = startMonth - 1;
    }
  }

  console.log("aagm===================");
  console.log(aagm);

  //-- printing start
  var line = []
line.push('MAKIN JUTA SDN BHD')
line.push("DEBTOR SYSTEM")
if (page == 1)
line.push("AGING DETAIL REPORT GROUP BY DOCUMENT DATE")
else if (page == 2)
line.push('AGING SUMMARY REPORT GROUP BY DOCUMENT DATE')
else if (page ==3 || page == 4) 
line.push('CUSTOMER STATEMENT AGING SUMMARY REPORT')


line.push(ddmmyy_ + '(LOCAL CURRENCY WITH TRANSACTION DATE)')

  ss = `<button id='printAging' onclick='var sheet = document.createElement("style");
  sheet.innerHTML = "tbody {  overflow-y: hidden; height: auto}";$("#printAging").hide();      
  document.body.appendChild(sheet);window.print();  sheet.innerHTML = "body {overflow-y: auto; height: auto}";$("#printAging").show();      
  document.body.appendChild(sheet);'>Print</button>`
    ss += '<center>' + line[0] + '</center><center>' + line[1] + '</center><center>' + line[2] + '</center><center>' + line[3] + '</center>';
  
  //ss += "<img src='csilogo2.png'>"
  ss += "<table >";

  //-- Detail
  oldname = "";
  oldln = 0;
  oldproject = "x";
  for (j = 0; j < aagm.length; j++) {
    aagm[j].amount = 0;
    aagm[j].subamount = 0;
    aagm[j].grandAmount = 0;
  }
  if (page == 2) {
    ss += `<th>Group</th>`;
    ss += `<th>Company</th>`;
    ss += `<th>Sale Person</th>`;
    ss += `<th>Terms</th>`;
    ss += "<td  bgcolor=#dddddc style='text-align: right;'>Amount</td>";

    for (j = aagm.length - 1; j >= 0; j--) {
      if (aagm[j].m == 0)
        ss +=
          "<td bgcolor='#ddddca' style='text-align: right;'> > " +
          monthName[MStoM(startMonth)] +
          "'" +
          MStoY(startMonth) +
          "</td>";
      else {
        let sst = MStoM(aagm[j].startMonth);

        let sse = MStoM(aagm[j].endMonth);

        if (sst == sse)
          ss +=
            "<td width=60px bgcolor='#dddddb' style='text-align: right;'>" +
            getMMYY(sst, aagm) +
            "</td>";
        else {
          ss +=
            "<td width=60px bgcolor='#ddddbf' style='text-align: right;'>" +
            getMMYY(sst, aagm) +
            "-" +
            getMMYY(sse, aagm) +
            "</td>";
        }
      }
    }
  }

  // loop thru detail
  for (ln in csi_) {
    ll = "";
    lln = csi_[ln];
    yymm_ = YM(lln["Invoice Date"]);
    InvoiceMonths = YYMM2M(lln["Invoice Date"]);

    // Filter by date
    // if (csi_[ln]["Invoice"] == "1002117") {
    //     alert("winner:" + yymm_ + ":" + yymm_)
    // }

    if (yymm_ <= yymm) {
      if (page == 3 || page == 4)
  
        if (oldproject != csi_[ln]["Project"] ) {
          if (oldproject != "x") {
             mobj = SubTotal(ss, aagm);
            ss = mobj.ss1;
            aagm = mobj.aagm;
          }
          oldproject = lln["Project"];
        }

      if (oldname != csi_[ln]["Customer Name"] || ln >= csi_.length) {
        if (oldname != "") {
          mobj = GroupTotal(ss, aagm, oldln);
          ss = mobj.ss1;
          aagm = mobj.aagm;
        }
        //----group header
        oldname = lln["Customer Name"];
        oldln = ln;
        if (page == 1) {
          ss +=
            "<tr><td colspan='1' ><h3>" +
            csi_[ln]["Customer"] +
            "</h3></td>" +
            "<td colspan='5'><h3>" +
            csi_[ln]["Customer Name"].trim() + "</h3></td>" + 
            "<td colspan='2'><h3>" + csi[ln]["Phone[1]"] + "</h3></td>" +
            "<td><h3>" + csi[ln]["Salesperson"] + "</h3></td>" +
            "</tr>";

          //** header

          ss += `<tr bgcolor="#dddddd">`;
  
          ss += `<th>Doc No</th>`;
          ss += `<th>Doc Date</th>`;
          ss += `<th>Due Date</th>`;
          ss += "<td  bgcolor=#dddddd style='text-align: right;'>Amount</td>";
        }

        // if (page == 2) {
        //   ss += `<th>Group</th>`;
        //   ss += `<th>Company</th>`;
        //   ss += `<th>Sale Person</th>`;
        //   ss += `<th>Terms</th>`;
        //   ss += "<td  bgcolor=#dddddd style='text-align: right;'>Amount</td>";
        // }

        if (page == 3 || page == 4) {
          ss +=
            "<tr><td colspan='2' ><h3>" +
            csi_[ln]["Customer"] +
            "</h3></td>" +
            "<td colspan='4'><h3>" +
            csi_[ln]["Customer Name"] +
            "</h3></td></tr>";

          address = csi_[ln]["Customer Address"];
          address = address.replace('"', "");
          address = address.replace('"', "");
          address_ = address.split("\n");
          for (itm in address_) ss += "<tr><td>" + address_[itm] + "</td></tr>";
          ss += `<th>Project</th>`;
          ss += "<th  bgcolor=#dddddd style='text-align: right;'>Amount</th>";
        }
        // print aging extention title
        if (page != 2)
          for (j = aagm.length - 1; j >= 0; j--) {
            if (startMonth == 0)
            mms = "Dec"
            else
            mms =  monthName[MStoM(startMonth-1)] ;
            if (aagm[j].m == 0)
              ss +=
                "<td bgcolor='#daaaaa' style='text-align: right;'> > " +
                mms +
                "'" +
                MStoY(startMonth-1) + //check here minus 1 due to dec is zero
                "</td>";
            else {
              let sst = MStoM(aagm[j].startMonth);

              let sse = MStoM(aagm[j].endMonth);

              if (sst == sse)
                ss +=
                  "<td width=60px bgcolor='#ddddbd' style='text-align: right;'>" +
                  getMMYY(sst, aagm) +
                  "</td>";
              else {
                ss +=
                  "<td width=60px bgcolor='#ddddba' style='text-align: right;'>" +
                  getMMYY(sst, aagm) +
                  "-" +
                  getMMYY2(sse, aagm) +
                  "</td>";
              }

              // + sst +  "=" + sse + ":" + aagm[j].startMonth + "---" + aagm[j].endMonth + "</td>"
            }
          }
        ss += "</tr>";
      }

     
      for (j = 0; j < aagm.length; j++) {
        if (
          InvoiceMonths >= aagm[j].startMonth &&
          InvoiceMonths <= aagm[j].endMonth
        ) {
          aagm[j].amount += parseFloat(lln["Amount"]);
          aagm[j].subamount += parseFloat(lln["Amount"]);
          aagm[j].grandAmount += parseFloat(lln["Amount"]);
        }
        //   }
      }
      if (page == 1) {
 
    //    ll += "<td>" + lln["Salesperson"] + "</td>";
        ll += "<td>" + lln["Invoice"] + "</td>";

        ll += "<td>" + ddmmyy(lln["Invoice Date"]) + "</td>";
        ll += "<td>" + lln["Due/Payment Date"] + "</td>";
      }

      if (page == 3) {
        ll += "<td>" + lln["Project"] + "</td>";
      }

      //   }
      // line aging ************
      total = 0;
      dll = "";
      for (j = aagm.length - 1; j >= 0; j--) {
        if (
          YYMM2M(lln["Invoice Date"]) >= aagm[j].startMonth &&
          YYMM2M(lln["Invoice Date"]) <= aagm[j].endMonth
        ) {
          amt = parseFloat(lln["Amount"])
          if (amt == 0)
          amts = "-"
          else
      //    amts = (amt) //amt.toFixed(2);
          amts = numCommas(amt.toFixed(2))
          dll +=
            "<td style='text-align: right;'>" +
            amts +
            "</td>";
          total += amt;
        } else dll += "<td></td>";
      }

      if (page == 1 || page == 3)
      {
        if (total == 0)
        tts = "-"
        else
        tts = numCommas(total.toFixed(2))
        ss +=
          "<tr>" +
          ll +
          "<td style='text-align: right;'>" +
          tts +
          "</td>" +
          dll +
          "</tr>";
      }
      total = 0;
      
    }

    if (page == 3 || page == 4)
 
        if (oldproject != csi_[ln]["Project"] || ln >= csi_.length-1) {
          if (oldproject != "x") {
             mobj = SubTotal(ss, aagm);
            ss = mobj.ss1;
            aagm = mobj.aagm;
          }
          oldproject = lln["Project"];
        }

  }



  mobj = GroupTotal(ss,aagm, ln);
  if ((page == 1) || (page == 2)) 
  mobj = GrandTotal(mobj.ss1,mobj.aagm,ln)
  ss = mobj.ss1;
  aagm = mobj.aagm;
  ss += "</table>";
  // background('green');
  // Use html() function
  xdiv.html(ss);
  xdiv.position(60, 10);
  xdiv.style("font-size", "9px");
  xdiv.style("color", "black");
 
  //if (page == 4)
  //html = $.parseHTML(replaceAll(ss,",","^"))
 // else
  html = $.parseHTML(ss)
  
  ss = "";

  
//************** */
table = new p5.Table();
table.addColumn('0');
table.addColumn('1');
table.addColumn('2');
table.addColumn('3');
table.addColumn('4');
table.addColumn('5');
table.addColumn('6');
table.addColumn('7');
table.addColumn('8');
table.addColumn('9');
table.addColumn('10');
table.addColumn('11');
table.addColumn('12');
table.addColumn('13');
table.addColumn('14');
table.addColumn('15');
table.addColumn('16');
table.addColumn('17');
table.addColumn('18');







var pos = 5

var haa = null;
haa = html[pos].rows

let newRow = table.addRow();
newRow.setString(0,"")
newRow.setString(1,"")
newRow.setString(2,"")
newRow.setString(3,line[0])
newRow = table.addRow();
newRow.setString(0,"")
newRow.setString(1,"")
newRow.setString(2,"")
newRow.setString(3,line[1])
newRow = table.addRow();
newRow.setString(0,"")
newRow.setString(1,"")
newRow.setString(2,"")
newRow.setString(3,line[2])
newRow = table.addRow();
newRow.setString(0,"")
newRow.setString(1,"")
newRow.setString(2,"")
newRow.setString(3,line[3])

for (i=0;i<haa.length;i++)
{
  let newRow = table.addRow();
  for (j=0;j < haa[i].cells.length;j++)
  {
//  newRow.setNum('c1', table.getRowCount() - 1);
ss = haa[i].cells[j].textContent.replace('\n','')
ss = ss.replace(/\s+/g," ");
//ss = replaceAll(ss,",","|")
  newRow.setString( j, ss);
  }
}

// let newRow = table.addRow();
// newRow.setNum('id', table.getRowCount() - 1);
// newRow.setString('species', html[8].rows[i][0]);


// To save, un-comment next line then click 'run'
 saveTable(table, 'new.csv');

  
  function SubTotal(ss1, aagm) {
    oldss = ss1
    ss1 += "<td>" + oldproject + "</td>";
    subtotal = 0;
    ss12 = "";
    for (j = aagm.length - 1; j >= 0; j--) {
      ss12 +=
        "<td style='text-align: right;'>" +
        numCommas(aagm[j].subamount.toFixed(2)) +
        "</td>";
      subtotal += aagm[j].subamount;
    }
    ss1 +=
      "<td style='text-align: right;'>" +
      numCommas(subtotal.toFixed(2)) +
      "</td>" +
      ss12 +
      "</tr>";
    for (j = aagm.length - 1; j >= 0; j--) {
      aagm[j].subamount = 0;
    }

    // ss1 += "<td>" + subtotal.toFixed(2) + "</td></tr>";
    if (subtotal == 0)
    ss1 = oldss
    else
    ss1 += "</tr>";
    subtotal = 0;
    return { ss1, aagm };

  }

  function GroupTotal(ss1, aagm, ln_) {
    ss1 += "<tr>";
    if (page == 1) {
     
      ss1 += "<td></td>";
      ss1 += "<td></td>";
      ss1 += "<td></td>";
  
    }

    if (page == 2)
      ss1 +=
        "<td >" +
        csi_[ln_]["Customer"] +
        "</td><td style='width: auto;' >" +
        csi_[ln_]["Customer Name"]
          .replace(" ", "&nbsp;")
          .replace(" ", "&nbsp;")
          .replace(" ", "&nbsp;") +
        "</td><td>" +
        csi_[ln_]["Salesperson"] +
        "</td><td>" +
        csi_[ln_]["Terms"] +
        "</td>";

    if (page == 3 || page == 4) ss1 += "<td >Total:" + "</td>";

    subtotal = 0;

    ss12 = "";
    for (j = aagm.length - 1; j >= 0; j--) {
      ss12 +=
        "<td style='border-top: 1px solid;border-color: #eeeeee;text-align: right;'>" +
        numCommas(aagm[j].amount.toFixed(2)) +
        "</td>";
      subtotal += aagm[j].amount;
    }
    ss1 +=
      "<td style='border-top: 1px solid;border-color: #eeeeee;text-align: right;'>" +
      numCommas(subtotal.toFixed(2)) +
      "</td>" +
      ss12;
    for (j = aagm.length - 1; j >= 0; j--) {
      aagm[j].amount = 0;
      aagm[j].subamount = 0;
    }

    // ss1 += "<td>" + subtotal.toFixed(2) + "</td></tr>";
    ss1 += "</tr>";
    subtotal = 0;
    return { ss1, aagm };
  }

  function GrandTotal(ss1, aagm, ln_) {
    ss1 += "<tr>";
    if (page == 1) {
      ss1 += "<td>Grand Total:</td>";
      ss1 += "<td></td>";
      ss1 += "<td></td>";

    }
    
    if (page == 2)
    {
      ss1 += "<td>Grand Total:</td>";
      ss1 += "<td></td>";
      ss1 += "<td></td>";
      ss1 += "<td></td>";
    }

    if (page == 4)
    {
      ss1 += "<td>Grand Total:</td>";
    }

      grandAmount = 0;

    ss12 = "";
    for (j = aagm.length - 1; j >= 0; j--) {
      ss12 +=
     
        "<td style='border-top: 1px solid;border-color: #eeeeee;text-align: right;'>" +
        numCommas(aagm[j].grandAmount.toFixed(2)) +
        "</td>";
      grandAmount += aagm[j].grandAmount;
    }
    ss1 +=
    "<td style='border-top: 1px solid;border-color: #eeeeee;text-align: right;'>" +
      numCommas(grandAmount.toFixed(2)) +
      "</td>" +
      ss12;
    for (j = aagm.length - 1; j >= 0; j--) {
      aagm[j].grandAmount = 0;
    }
    // ss1 += "<td>" + subtotal.toFixed(2) + "</td></tr>";
    ss1 += "</tr>";
    return { ss1, aagm };
  }
 }

function replaceAll(str, find, replace) {
  var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return str.replace(new RegExp(escapedFind, 'g'), replace);
}