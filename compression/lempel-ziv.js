const Buffer = require('buffer').Buffer;
export function encoding(input){
    if(input){
    let table = {};
    for(let i=0;i<=255;i++){
        let ch = "";
        ch+=String.fromCharCode(i);
        table[ch] = i;
    }
    let p ="" ,c = "";
    p+=input[0];
    let code = 256;
    let output_code = [];
    // console.log("String\t Output Code\t Addition\n");
    for(let i=0;i<input.length;i++){
        if(i!=input.length-1)
            c+=input.charAt(i+1);
        if(table[p+c]!=table[table.length-1])
            p=p+c;
        else{
            output_code.push(table[p]);
            table[p+c] = code;
            code++;
            p=c;
        }
        c=""
    }
    output_code.push(table[p]);
    const bufferByte = Buffer.from(output_code,"utf-8");
    return bufferByte;
    }
    else
        return null;
}

export function decoding(output){
    let table = {};
    for(let i=0;i<=255;i++){
        let ch = "";
        ch+=String.fromCharCode(i);
        table[i] = ch;
    }
    let old = output[0],n;
    let s = table[old];
    let c = "";
    c += s[0];
    let decode = ""
    decode+=s;
    let count = 256;
    for(let i=0;i<output.length-1;i++){
        n = output[i+1];
        if(table[n]==table[table.length-1]){
            s=table[old];
            s=s+c;
        }
        else
            s=table[n];

        decode+=s
        c="";
        c+=s[0];
        table[count]=table[old]+c;
        count++;
        old = n;    
    }
    return decode;
}