
/**
 * Some general utility methods
 */
const Util = {
    /**
     * Get html table
     * @param columns: array of strings
     * @param data: array of arrays of data
     */
    get_table: function(columns, data, style='') {
        var result = [`<table class='table table-bordered table-condensed' style="${style}">`];
        if(columns){
            result.push("<thead>")
            result.push("<tr>")
            for (let h of columns){
                result.push(`<th>${h}</th>`)
            }
            result.push("</tr>")
            result.push("</thead>")
        }

        if(data){
            result.push("<tbody>")
            for(let row of data) {
                    result.push("<tr>")
                    for(let cell of row){
                            result.push(`<td>${cell}</td>`)
                    }
                    result.push("</tr>")
            }
        }
        result.push("</tbody>")
        result.push("</table>")
        return result.join('\n')
    },
    /**
     * Escape gdb's output to be browser compatible
     * @param s: string to mutate
     */
    escape: function(s){
        return s.replace(/>/g, "&gt;")
                .replace(/</g, "&lt;")
                .replace(/\\n/g, '<br>')
                .replace(/\\r/g, '')
                .replace(/\\"/g, '"')
                .replace(/\\t/g, '&nbsp')
    },
    /**
     * take a string of html in JavaScript and strip out the html
     * http://stackoverflow.com/a/822486/2893090
     */
    get_text_from_html: function(html){
       var tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       return tmp.textContent || tmp.innerText || "";
    },
    /**
     * @param fullname_and_line: i.e. /path/to/file.c:78
     * @param default_line_if_not_found: i.e. 0
     * @return: Array, with 0'th element == path, 1st element == line
     */
    parse_fullname_and_line: function(fullname_and_line, default_line_if_not_found=undefined){
        let user_input_array = fullname_and_line.split(':'),
            fullname = user_input_array[0],
            line = default_line_if_not_found
        if(user_input_array.length === 2){
            line = user_input_array[1]
        }
        return [fullname, parseInt(line)]
    },
    /**
     * @param mi_obj: gdb mi obj from pygdbmi
     * @return array of error messages and frame information (if any)
     */
    get_err_text_from_mi_err_response: function(mi_obj){
        const interesting_keys = ['msg', 'reason', 'signal-name', 'signal-meaning']
        let text = []
        for(let k of interesting_keys){
            if (mi_obj.payload[k]) {text.push(mi_obj.payload[k])}
        }

        if (mi_obj.payload.frame){
            for(let i of ['file', 'func', 'line', 'addr']){
                if (i in mi_obj.payload.frame){
                    text.push(`${i}: ${mi_obj.payload.frame[i]}`)
                }
            }
        }
        return text
    }
}

export default Util;
