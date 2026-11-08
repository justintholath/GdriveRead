function arabicToRoman(num, lowercase = false) {
  if (num <= 0 || num > 3999) return ""; // Standard valid range

  const romanMap = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" }
  ];

  let result = "";
  for (let i = 0; i < romanMap.length; i++) {
    while (num >= romanMap[i].value) {
      result += romanMap[i].numeral;
      num -= romanMap[i].value;
    }
  }

  return lowercase ? result.toLowerCase() : result;
}

function formatStr(inString) {
    var outString = ''
    if (inString.substring(0, 2) == "- ") {
        outString = '&bull;' + inString.substring(1)
    }
    else {
        outString = inString
    };
    if (outString.includes("~a href") && outString.includes("~/a~")) {
        outString = outString.replace("~a href","<a href").replace("~",">").replace("~/a~","</a>")
    }
    while (outString.includes("~b~")) {
        outString = outString.replace("~b~","<b>")
        if (outString.includes("~b~")) {
            outString = outString.replace("~b~","</b>")
        } else {
            outString += "</b>"
        }
    }
    if (outString.includes("~b1~")) {
        outString = outString.replace("~b1~",'<span style="color: black; font-size: 24px; font-weight: bold;">')
        if (outString.includes("~b1~")) {
            outString = outString.replace("~b1~","</span>")
        } else {
            outString += "</span>"
        }
    }
    if (outString.includes("~b2~")) {
        outString = outString.replace("~b2~",'<span style="color: black; font-size: 16px; font-weight: bold;">')
        if (outString.includes("~b2~")) {
            outString = outString.replace("~b2~","</span>")
        } else {
            outString += "</span>"
        }
    }
    if (outString.includes("~r~")) {
        outString = outString.replace("~r~",'<span style="float: right;">')
        outString += "</span>"
    }
    while (outString.includes("~i~")) {
        outString = outString.replace("~i~","<i>")
        if (outString.includes("~i~")) {
            outString = outString.replace("~i~","</i>")
        } else {
            outString += "</i>"
        }
    }
    if (outString.includes("~u~")) {
        outString = outString.replace("~u~","<u>")
        if (outString.includes("~u~")) {
            outString = outString.replace("~u~","</u>")
        } else {
            outString += "</u>"
        }
    }
    while (outString.includes("~m~")) {
        outString = outString.replace("~m~","<mark>")
        if (outString.includes("~m~")) {
            outString = outString.replace("~m~","</mark>")
        } else {
            outString += "</mark>"
        }
    }

    while (outString.includes("~he~")) {
        outString = outString.replace("~he~",'<span class="hebrew" lang="he" dir="rtl">')
        if (outString.includes("~he~")) {
            outString = outString.replace("~he~","</span>&lrm;")
        } else {
            outString += "</span>&lrm;"
        }
    }
    
    while (outString.includes("~g~")) {
        outString = outString.replace("~g~",'<span style="color: black; background-color: #76d598; font-weight;">')
        if (outString.includes("~g~")) {
            outString = outString.replace("~g~","</span>")
        } else {
            outString += "</span>"
        }
    }
    while (outString.includes("~rd~")) {
        outString = outString.replace("~rd~",'<span style="color: black; background-color: #FF8A8A; font-weight;">')
        if (outString.includes("~rd~")) {
            outString = outString.replace("~rd~","</span>")
        } else {
            outString += "</span>"
        }
    }
    return outString
};

        
/**
         * Converts basic Markdown (headers, lists, and paragraphs) to HTML using pure JavaScript.
         * This function manually handles nested lists based on simple indentation (4 spaces).
         */


function markdownToHtml(markdown) {
    const lines = (markdown + "\n").split('\n');
    let toc = '';
    let refresh_page = '<span onclick="ReadFiles()" style="cursor: pointer; color: blue; text-decoration: none; font-size: 16px;">Page </span>'
    let toc_page = ""
    let toc_pixel = 56;
    let html = '';
    let page_build = '';
    let page_pixel = 0;
    let page_write_flag = 0;
    let forward_pixel = 0;
    let forward_j = 0;
    let potential_page_end_found = 0;
    let cpage = 1;
    let toc_flag = 1;
    let h1_count = 1; let h2_count = 1; let h3_count = 1;
    let curr_toc_page = 1;
    let temp_str = '';
    let hdr_flag = 1;
    let temp_string = "";

    var col_lines = "";
    let table_found = 0; 
    let table_length = 0;
    let table_last_width = 0;
    let hdr_name = ""
    let table_height = 30

    for (let line_i = 0; line_i < (lines.length - 1); line_i++) {
        const line = lines[line_i]; // The current line
        page_write_flag = 0;
        var nu_line = ""

        const hdr_chk = line.substring(0, 3);
        switch (hdr_chk) {
            case "===":
                break;
            case "h0:":
                toc_page += '<h1>' + line.substring(3) + '</h1>';
                document.title = line.substring(3)
                break;
            case "h1:":
                hdr_name = line.substring(3)
                nu_line = '<h1 id="' + 'S' + h1_count + '">' + line.substring(3) + '</h1>';
                toc_page += '<br><a href="#' + 'S' + h1_count + '" style="text-decoration: none;">' + line.substring(3);
                toc_page += '</a><span style="float: right;">Page ' + cpage + '</span><br>';
                h1_count += 1;
                h2_count = 1; h3_count = 1;
                toc_pixel += 15;
                page_pixel += 50;
                if (toc_pixel > 650) {
                    toc += '<div class="container">' + toc_page + '</div>'; 
                    toc += '<div class="cfooter">' + refresh_page + arabicToRoman(curr_toc_page, true) + '</div>'; 
                    toc += '<div class="page-break"></div>'; 
                    toc_page = ''; toc_pixel = 0; curr_toc_page += 1;
                };
                if (page_build == '') {
                    hdr_flag = 0;
                };
                break;
            case "h2:":
                nu_line = '<h2 id="' + 'S' + h1_count + 'C' + h2_count + '">' + line.substring(3) + '</h2>';
                toc_page += '&emsp; <a href="#' + 'S' + h1_count + 'C' + h2_count + '" style="text-decoration: none;  font-size: 13px;">';
                toc_page += line.substring(3);
                toc_page += '</a><span style="float: right;">Page ' + cpage + '</span><br>';
                h2_count += 1; h3_count = 1;
                toc_pixel += 15;
                page_pixel += 40;
                if (toc_pixel > 650) {
                    toc += '<div class="container">' + toc_page + '</div>'; 
                    toc += '<div class="cfooter">' + refresh_page + arabicToRoman(curr_toc_page, true) + '</div>'; 
                    toc += '<div class="page-break"></div>'; 
                    toc_page = ''; toc_pixel = 0; curr_toc_page += 1;
                };
                break;
            case "h3:":
                nu_line = '<h3 id="' + 'S' + h1_count + 'C' + h2_count + 'P' + h3_count + '">' + line.substring(3) + '</h3>';
                toc_page += '&emsp; &emsp; <a href="#' + 'S' + h1_count + 'C' + h2_count + 'P' + h3_count;
                toc_page += '" style="text-decoration: none; color: black; font-size: 12px; ">' + line.substring(3);
                toc_page += '</a><span style="float: right;">Page ' + cpage + '</span><br>';
                h3_count += 1;
                toc_pixel += 15;
                page_pixel += 40;
                if (toc_pixel > 650) {
                    toc += '<div class="container">' + toc_page + '</div>'; 
                    toc += '<div class="cfooter">' + refresh_page + arabicToRoman(curr_toc_page, true) + '</div>'; 
                    toc += '<div class="page-break"></div>'; 
                    toc_page = ''; toc_pixel = 0; curr_toc_page += 1;
                };
                break;
            case "h3:":
                nu_line = '<h3>' + formatStr(line.substring(3)) + '</h3>'
                page_pixel += 35;
                break;
            case "h4:":
                nu_line = '<h4>' + formatStr(line.substring(3)) + '</h4>'
                page_pixel += 30;
                break;
            case "h5:":
                page_pixel += 25;
                nu_line = '<h5>' + formatStr(line.substring(3)) + '</h5>'
                break;
            case "hr:":
                nu_line = '<hr style="height: 1px; background-color: grey; border: none; margin-top: 0px; margin-bottom: 0px;">' 
                page_pixel += 1;
                break;
            case "in:":
            case "ip:":
                page_pixel += (Math.ceil(line.length / 95)) * 15 + 8;
                nu_line = '<p style="margin-left: 18px;";>' + formatStr(line.substring(3)) + '</p>'
                break;
            case "iq:":
                page_pixel += (Math.ceil(line.length / 90)) * 15 + 8;
                nu_line = '<p style="margin-left: 36px;";>' + formatStr(line.substring(3)) + '</p>'
                break;
            case "ln:":
                page_pixel += (Math.ceil(line.length / 95)) * 15 + 8;
                nu_line = '<p style="margin-left: 18px;";>' + '<br>' + '</p>'
                break;
            case "pb:":
                page_pixel = 99999;
                break;
            case "t2:":
                nu_line = '<table style="border: none; border-collapse: collapse;">'
                col_lines = line.substring(3).split("||");
                table_length = col_lines.length
                nu_line += '<tr>'
                for (let table_i = 0; table_i <= table_length - 2; table_i++){
                    nu_line += '<td style="width: 20%; text-align: left; border: none">' + formatStr(col_lines[table_i]) + '</td>'
                };
                table_last_width = 100 - 20 * (table_length - 2);
                nu_line += '<td style="width: ' + table_last_width + '%; text-align: left; border: none">' 
                nu_line += formatStr(col_lines[table_length - 1]) + '</td>'
                nu_line += '</tr></table>'
                page_pixel += table_height;
                break;
            case "tq:":
                nu_line = '<table style="border: none; border-collapse: collapse;">'
                col_lines = line.substring(3).split("||");
                table_length = col_lines.length
                nu_line += '<tr>'
                for (let table_i = 0; table_i <= table_length - 2; table_i++){
                    nu_line += '<td style="width: 25%; text-align: left; border: none">' + formatStr(col_lines[table_i]) + '</td>'
                };
                table_last_width = 100 - 25 * (table_length - 2);
                nu_line += '<td style="width: ' + table_last_width + '%; text-align: left; border: none">' 
                nu_line += formatStr(col_lines[table_length - 1]) + '</td>'
                nu_line += '</tr></table>'
                page_pixel += table_height;
                break;
            case "th:":
                nu_line = '<table style="border: none; border-collapse: collapse;">'
                col_lines = line.substring(3).split("||");
                table_length = col_lines.length
                nu_line += '<tr>'
                for (let table_i = 0; table_i <= table_length - 2; table_i++){
                    nu_line += '<td style="width: 16.66%; text-align: left; border: none">' + formatStr(col_lines[table_i]) + '</td>'
                };
                table_last_width = 100 - 16.66 * (table_length - 2);
                nu_line += '<td style="width: ' + table_last_width + '%; text-align: left; border: none">' 
                nu_line += formatStr(col_lines[table_length - 1]) + '</td>'
                nu_line += '</tr></table>'
                page_pixel += table_height;
                break;
            case "ts:":
                nu_line = '<table style="border: none; border-collapse: collapse;">'
                col_lines = line.substring(3).split("||");
                table_length = col_lines.length
                nu_line += '<tr>'
                for (let table_i = 0; table_i <= table_length - 2; table_i++){
                    nu_line += '<td style="width: 14.29%; text-align: left; border: none">' + formatStr(col_lines[table_i]) + '</td>'
                };
                table_last_width = 100 - 14.29 * (table_length - 2);
                nu_line += '<td style="width: ' + table_last_width + '%; text-align: left; border: none">' 
                nu_line += formatStr(col_lines[table_length - 1]) + '</td>'
                nu_line += '</tr></table>'
                page_pixel += table_height;
                break;
            case "to:":
                nu_line = '<table style="border: none; border-collapse: collapse;">'
                col_lines = line.substring(3).split("||");
                table_length = col_lines.length
                nu_line += '<tr>'
                for (let table_i = 0; table_i <= table_length - 2; table_i++){
                    nu_line += '<td style="width: 12.5%; text-align: left; border: none">' + formatStr(col_lines[table_i]) + '</td>'
                };
                table_last_width = 100 - 12.5 * (table_length - 2);
                nu_line += '<td style="width: ' + table_last_width + '%; text-align: left; border: none">' 
                nu_line += formatStr(col_lines[table_length - 1]) + '</td>'
                nu_line += '</tr></table>'
                page_pixel += table_height;
                break;
            case "t3:":
                nu_line = '<table style="border: none; border-collapse: collapse;">'
                col_lines = line.substring(3).split("||");
                table_length = col_lines.length
                nu_line += '<tr>'
                for (let table_i = 0; table_i <= table_length - 2; table_i++){
                    nu_line += '<td style="width: 30%; text-align: left; border: none">' + formatStr(col_lines[table_i]) + '</td>'
                };
                table_last_width = 100 - 30 * (table_length - 2);
                nu_line += '<td style="width: ' + table_last_width + '%; text-align: left; border: none">' 
                nu_line += formatStr(col_lines[table_length - 1]) + '</td>'
                nu_line += '</tr></table>'
                page_pixel += table_height;
                break;
            case "t5:":
                nu_line = '<table style="border: none; border-collapse: collapse;">'
                col_lines = line.substring(3).split("||");
                table_length = col_lines.length
                nu_line += '<tr>'
                for (let table_i = 0; table_i <= table_length - 2; table_i++){
                    nu_line += '<td style="width: 50%; text-align: left; border: none">' + formatStr(col_lines[table_i]) + '</td>'
                };
                table_last_width = 100 - 50 * (table_length - 2);
                nu_line += '<td style="width: ' + table_last_width + '%; text-align: left; border: none">' 
                nu_line += formatStr(col_lines[table_length - 1]) + '</td>'
                nu_line += '</tr></table>'
                page_pixel += table_height;
                break;
            default:
                if (line.trim() == '') {
                    page_pixel += 5;
                    nu_line = '<div style="height: 5px;"></div>';
                }
                else {
                    nu_line = formatStr(line + '<br>')
                    page_pixel += (Math.ceil((line.length + 1) / 94)) * 15;
                };
        };
        page_build += nu_line;
        if (lines[line_i + 1].substring(0, 3) == "h1:" && page_pixel > 800) {
            page_write_flag = 1;
        }
        else {
            if (hdr_flag == 0) {forward_pixel = 25;}
            else {forward_pixel = 23 + 25}
            forward_j = 1;
            potential_page_end_found = 0;
            while (potential_page_end_found == 0 && (line_i + forward_j) < lines.length) {
                let next_line = lines[line_i + forward_j];
                let next_hdr = next_line.substring(0, 3);
                switch (next_hdr) {
                    case "===":
                        break;
                    case "h1:":
                        forward_pixel += 50; break;
                    case "h2:":
                        forward_pixel += 40; break;
                    case "h3:":
                        forward_pixel += 35; break;
                    case "h4:":
                        forward_pixel += 30; break;
                    case "h5:":
                        forward_pixel += 25; break;
                    case "hr:":
                        forward_pixel += 1;
                        potential_page_end_found = 1;
                        break;
                    case "pb:":
                        potential_page_end_found = 1;
                        break;
                    default:
                        if (next_line.trim() == '') {
                            forward_pixel += 5;
                        }
                        else {
                            let lines_count = Math.ceil((next_line.length) / 94);
                            forward_pixel += lines_count * 15 + 8;
                        };
                        potential_page_end_found = 1;
                };
                if (page_pixel + forward_pixel > 1070) {
                    page_write_flag = 1;
                }
                else {
                    if (potential_page_end_found == 1) {
                        page_write_flag = 0;
                    };
                };
                forward_j += 1;
            }; 
        };

        if (page_write_flag == 1) {
            html += '<div class="container">'
            if (hdr_flag > 0) {
                html += '<p style="text-align: center;">' + hdr_name + '</p>';
            };
            html += '<div style="height: 25px;"></div>' + page_build + '</div>';
            html += '<div class="cfooter">' + refresh_page + cpage + '</div><div class="page-break"></div>';
            page_build = '';
            page_pixel = 0;
            hdr_flag = 1;
            cpage += 1
        };
    };
    if (page_build != '') {
        html += '<div class="container"><p style="text-align: center;">' + hdr_name + '</p><br>';
        html += page_build + '</div>';
        html += '<div class="cfooter">' + refresh_page + cpage + '</div>';
    };
    if (toc_page != '') {
        toc += '<div class="container">' + toc_page + '</div>'; 
        toc += '<div class="cfooter">' + refresh_page + arabicToRoman(curr_toc_page, true) + '</div>'; 
        toc += '<div class="page-break"></div>'; 
        toc_page = ''; toc_pixel = 0; curr_toc_page += 1;
    };
    return toc + html;
};

/**
         * Main function to trigger conversion on input.
         */
function convertMarkdown(markdownText) {
    try {
        const html_ret = markdownToHtml(markdownText);
        htmlOutput.innerHTML = html_ret;
    } catch (error) {
        htmlOutput.innerHTML = `<p>Error in Native Conversion:</p><pre>${error.message}</pre>`;
        console.error("Native Markdown conversion failed:", error);
    }
};

