export interface COLUMN {
    key?: string;
    name: string;
    colname_user?: string;
    colname?: string;
    width?: string;
    type?: string;
    format?: string;
    sort?: string;
    disabled_sort?: boolean;
    special_key?: string;
    status?: boolean;
    require?: boolean;
    sticky?: boolean;
    styles?: any;
  }
  
  export function createColumn(obj: COLUMN) {
    return {
      key: obj.key ? obj.key : "",
      name: obj.name ? obj.name : "",
      colname: obj.colname ? obj.colname : "",
      colname_user: obj.colname_user ? obj.colname_user : "",
      width: obj.width ? obj.width : "100px",
      type: obj.type ? obj.type : "text",
      format: obj.format ? obj.format : "",
      sort: obj.sort ? obj.sort : "",
      disabled_sort: obj.disabled_sort ? obj.disabled_sort : false,
      special_key: obj.special_key ? obj.special_key : "",
      status: obj.status === undefined || obj.status === true ? true : false,
      require: obj.require ? obj.require : false,
      sticky: obj.sticky ? obj.sticky : false,
      styles: obj && obj.styles ? obj.styles : {
        // thuộc tính của cột đó: màu sắc, in đậm, in nghiêng....
        "color": "",
        "justify-content": "",
        "font-weight": "",
        "font-style": "",
        "text-decoration": "",
        "width": obj.width ? obj.width : "100px",
      },
    };
  }
  