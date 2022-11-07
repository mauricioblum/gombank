var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react"), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }, void 0, !1, {
    fileName: "app/entry.server.tsx",
    lineNumber: 11,
    columnNumber: 33
  }, this));
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react10 = require("@remix-run/react");

// app/components/Button.tsx
var import_classnames = __toESM(require("classnames")), import_button = require("ariakit/button"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), Button = ({
  children,
  variant = "primary",
  className,
  disabled,
  ...rest
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_button.Button, {
  ...rest,
  className: (0, import_classnames.default)(
    "flex items-center justify-center whitespace-nowrap rounded-lg px-4 leading-6 h-10 border-2",
    {
      "bg-neutral-700 hover:bg-neutral-800 text-white border-neutral-700 hover:border-neutral-800": variant === "primary",
      "bg-lime-400 hover:bg-lime-500 text-white border-lime-400 hover:border-lime-500": variant === "secondary",
      "bg-white hover:bg-neutral-700 text-neutral-700 hover:text-white border-neutral-700 hover:border-neutral-700": variant === "tertiary",
      "cursor-not-allowed bg-neutral-200 text-white border-neutral-200 hover:bg-neutral-200 hover:border-neutral-200": disabled
    },
    className
  ),
  children
}, void 0, !1, {
  fileName: "app/components/Button.tsx",
  lineNumber: 19,
  columnNumber: 5
}, this);

// app/components/Dialog.tsx
var import_react2 = __toESM(require("react")), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), Dialog = import_react2.default.forwardRef(({ onButtonCloseClick, content }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dialog", {
  ref,
  className: "min-w-[350px] min-h-[155px] absolute bg-gray-50 rounded border border-white drop-shadow",
  children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
      className: "absolute top-2 right-4",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        onClick: onButtonCloseClick,
        className: "cursor-pointer text-neutral-600 font-bold text-lg",
        children: "\u2716"
      }, void 0, !1, {
        fileName: "app/components/Dialog.tsx",
        lineNumber: 17,
        columnNumber: 9
      }, this)
    }, void 0, !1, {
      fileName: "app/components/Dialog.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
      className: "w-full",
      children: content
    }, void 0, !1, {
      fileName: "app/components/Dialog.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this)
  ]
}, void 0, !0, {
  fileName: "app/components/Dialog.tsx",
  lineNumber: 12,
  columnNumber: 5
}, this));
Dialog.displayName = "Dialog";

// app/components/Progress.tsx
var import_react3 = require("@remix-run/react"), import_react4 = require("react"), import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function useProgress() {
  let el = (0, import_react4.useRef)(null), timeout = (0, import_react4.useRef)(), { location } = (0, import_react3.useTransition)();
  return (0, import_react4.useEffect)(() => {
    if (!location || !el.current)
      return;
    timeout.current && clearTimeout(timeout.current);
    let current = el.current;
    current.style.width = "0%";
    let updateWidth = (ms) => {
      timeout.current = setTimeout(() => {
        if (current) {
          let width = parseFloat(current.style.width), percent = isNaN(width) ? 0 : 10 + 0.9 * width;
          current.style.width = `${percent}%`, updateWidth(100);
        }
      }, ms);
    };
    return updateWidth(300), () => {
      clearTimeout(timeout.current), (current == null ? void 0 : current.style.width) !== "0%" && (current && (current.style.width = "100%"), timeout.current = setTimeout(() => {
        (current == null ? void 0 : current.style.width) === "100%" && (current.style.width = "");
      }, 200));
    };
  }, [location]), el;
}
function Progress() {
  let progress = useProgress();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    className: "fixed top-0 left-0 right-0 flex h-1",
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
      ref: progress,
      className: "bg-gradient-to-r from-lime-400/50 via-lime-500 to-lime-800 transition-all duration-200 ease-out"
    }, void 0, !1, {
      fileName: "app/components/Progress.tsx",
      lineNumber: 66,
      columnNumber: 7
    }, this)
  }, void 0, !1, {
    fileName: "app/components/Progress.tsx",
    lineNumber: 65,
    columnNumber: 5
  }, this);
}

// app/components/Select.tsx
var import_select = require("ariakit/select"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), Select = ({ items, defaultValue, label, name, onChange }) => {
  let select = (0, import_select.useSelectState)({
    defaultValue: defaultValue == null ? void 0 : defaultValue.value,
    sameWidth: !0,
    gutter: 4,
    setValue: (value) => {
      onChange == null || onChange(value);
    }
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    className: "flex flex-col",
    children: [
      label && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_select.SelectLabel, {
        state: select,
        children: label
      }, void 0, !1, {
        fileName: "app/components/Select.tsx",
        lineNumber: 37,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_select.Select, {
        state: select,
        name,
        className: "flex h-10 w-full min-w-[60px] cursor-default items-center justify-between gap-1 whitespace-no-wrap rounded-md pl-4 pr-4 text-base leading-6 shadow-md border border-neutral-200"
      }, void 0, !1, {
        fileName: "app/components/Select.tsx",
        lineNumber: 38,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_select.SelectPopover, {
        state: select,
        className: "z-50 flex flex-col overflow-y-auto overflow-x-hidden min-w-[60px] max-h-[300px] rounded-lg border border-solid p-2 shadow-md bg-white",
        children: items.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_select.SelectItem, {
          className: "flex cursor-default items-center gap-2 rounded p-2 outline-none hover:bg-neutral-200",
          value: item.value,
          disabled: item.disabled
        }, item.id, !1, {
          fileName: "app/components/Select.tsx",
          lineNumber: 48,
          columnNumber: 11
        }, this))
      }, void 0, !1, {
        fileName: "app/components/Select.tsx",
        lineNumber: 43,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/components/Select.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
};

// app/components/Sidebar.tsx
var import_react5 = require("@remix-run/react"), import_react6 = require("react"), import_classnames2 = __toESM(require("classnames")), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), Sidebar = ({ sidebarTitle, items }) => {
  var _a;
  let currentPath = ((_a = (0, import_react5.useMatches)().at(-1)) == null ? void 0 : _a.pathname) ?? "", [open, setOpen] = (0, import_react6.useState)(!1);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "lg:hidden",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("details", {
          open,
          onClick: (e) => {
            e.preventDefault(), setOpen(!open);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("summary", {
              onClick: () => setOpen(!open),
              className: "cursor-pointer pb-4 pt-6 flex",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "30",
                height: "30",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                className: "ml-2",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
                    x1: "3",
                    y1: "12",
                    x2: "21",
                    y2: "12"
                  }, void 0, !1, {
                    fileName: "app/components/Sidebar.tsx",
                    lineNumber: 46,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
                    x1: "3",
                    y1: "6",
                    x2: "21",
                    y2: "6"
                  }, void 0, !1, {
                    fileName: "app/components/Sidebar.tsx",
                    lineNumber: 47,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
                    x1: "3",
                    y1: "18",
                    x2: "21",
                    y2: "18"
                  }, void 0, !1, {
                    fileName: "app/components/Sidebar.tsx",
                    lineNumber: 48,
                    columnNumber: 15
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/components/Sidebar.tsx",
                lineNumber: 34,
                columnNumber: 13
              }, this)
            }, void 0, !1, {
              fileName: "app/components/Sidebar.tsx",
              lineNumber: 33,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
              className: "bg-neutral-800 w-screen h-screen flex flex-col items-center ",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
                children: items.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react5.NavLink, {
                  to: item.to,
                  prefetch: "intent",
                  onClick: () => {
                    console.log("navlin"), setOpen(!1);
                  },
                  className: (0, import_classnames2.default)(
                    "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer font-bold text-xl",
                    {
                      "text-lime-400": currentPath === item.to,
                      "text-white hover:bg-lime-600": currentPath !== item.to
                    }
                  ),
                  children: item.title
                }, item.id, !1, {
                  fileName: "app/components/Sidebar.tsx",
                  lineNumber: 54,
                  columnNumber: 17
                }, this))
              }, void 0, !1, {
                fileName: "app/components/Sidebar.tsx",
                lineNumber: 52,
                columnNumber: 13
              }, this)
            }, void 0, !1, {
              fileName: "app/components/Sidebar.tsx",
              lineNumber: 51,
              columnNumber: 11
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 26,
          columnNumber: 9
        }, this)
      }, void 0, !1, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 25,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
        className: "hidden lg:block h-auto min-h-screen lg:left-0 p-2 min-w-[300px] overflow-y-auto text-center bg-neutral-800 drop-shadow-md",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "text-gray-100 text-xl",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                className: "p-2.5 mt-1 flex items-center",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
                  className: "font-bold text-gray-200 ml-3",
                  children: sidebarTitle
                }, void 0, !1, {
                  fileName: "app/components/Sidebar.tsx",
                  lineNumber: 80,
                  columnNumber: 13
                }, this)
              }, void 0, !1, {
                fileName: "app/components/Sidebar.tsx",
                lineNumber: 79,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                className: "my-2 bg-gray-600 h-[1px]"
              }, void 0, !1, {
                fileName: "app/components/Sidebar.tsx",
                lineNumber: 82,
                columnNumber: 11
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/components/Sidebar.tsx",
            lineNumber: 78,
            columnNumber: 9
          }, this),
          items.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react5.NavLink, {
            to: item.to,
            prefetch: "intent",
            className: (0, import_classnames2.default)(
              "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer font-bold",
              {
                "text-lime-400": currentPath === item.to,
                "text-white hover:bg-lime-600": currentPath !== item.to
              }
            ),
            children: item.title
          }, item.id, !1, {
            fileName: "app/components/Sidebar.tsx",
            lineNumber: 86,
            columnNumber: 11
          }, this))
        ]
      }, void 0, !0, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 77,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/components/Sidebar.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
};

// app/components/TransactionsTable.tsx
var import_react7 = __toESM(require("react")), import_react_table = require("react-table");

// app/utils/formatCurrency.ts
function formatCurrency(value, currency = "EUR") {
  try {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency }).format(value);
  } catch {
    return new Intl.NumberFormat("de-DE").format(value) + ` ${currency.toUpperCase()}`;
  }
}

// app/utils/formatDate.ts
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-UK", {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "numeric"
  });
}

// app/components/TransactionsTable.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  let count = preFilteredRows.length;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
    value: filterValue || "",
    onChange: (e) => {
      setFilter(e.target.value || void 0);
    },
    placeholder: `Search ${count} records...`,
    className: "text-sm text-white bg-lime-600 outline-none focus:border-neutral-700 placeholder:text-gray-300 px-2 py-1 border rounded-md border-white"
  }, void 0, !1, {
    fileName: "app/components/TransactionsTable.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
}
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  let count = preGlobalFilteredRows == null ? void 0 : preGlobalFilteredRows.length, [value, setValue] = import_react7.default.useState(globalFilter);
  return import_react7.default.useEffect(() => {
    let debounce = setTimeout(() => {
      setGlobalFilter == null || setGlobalFilter(value || void 0);
    }, 300);
    return () => {
      clearTimeout(debounce);
    };
  }, [setGlobalFilter, value]), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
    className: "mb-2",
    children: [
      "Search:",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
        value: value || "",
        onChange: (e) => {
          setValue(e.target.value);
        },
        placeholder: `${count} records...`,
        className: "border border-neutral-400 rounded-md ml-1 py-1 px-2 outline-none focus:border-lime-700"
      }, void 0, !1, {
        fileName: "app/components/TransactionsTable.tsx",
        lineNumber: 61,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/components/TransactionsTable.tsx",
    lineNumber: 59,
    columnNumber: 5
  }, this);
}
function Table({ columns, data }) {
  let defaultColumn = import_react7.default.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  ), {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    state,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize }
  } = (0, import_react_table.useTable)(
    {
      columns,
      data,
      defaultColumn,
      disableMultiSort: !0,
      initialState: {
        sortBy: [
          {
            id: "date",
            desc: !0
          }
        ]
      }
    },
    import_react_table.useFilters,
    import_react_table.useGlobalFilter,
    import_react_table.useSortBy,
    import_react_table.usePagination
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    className: "flex flex-col justify-between",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GlobalFilter, {
        preGlobalFilteredRows,
        globalFilter: state.globalFilter,
        setGlobalFilter
      }, void 0, !1, {
        fileName: "app/components/TransactionsTable.tsx",
        lineNumber: 127,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "min-h-full overflow-x-auto",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
          ...getTableProps(),
          className: "table-fixed rounded-lg border-collapse w-full",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
              className: "bg-lime-600 text-white py-2 text-lg text-left",
              children: headerGroups.map((headerGroup) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
                ...headerGroup.getHeaderGroupProps(),
                children: headerGroup.headers.map((column) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
                  ...column.getHeaderProps(),
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
                      ...column.getSortByToggleProps(),
                      children: [
                        column.render("Header"),
                        column.isSorted ? column.isSortedDesc ? " \u25BC" : " \u25B2" : ""
                      ]
                    }, void 0, !0, {
                      fileName: "app/components/TransactionsTable.tsx",
                      lineNumber: 140,
                      columnNumber: 23
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/components/TransactionsTable.tsx",
                    lineNumber: 139,
                    columnNumber: 21
                  }, this)
                }, void 0, !1, {
                  fileName: "app/components/TransactionsTable.tsx",
                  lineNumber: 138,
                  columnNumber: 19
                }, this))
              }, void 0, !1, {
                fileName: "app/components/TransactionsTable.tsx",
                lineNumber: 136,
                columnNumber: 15
              }, this))
            }, void 0, !1, {
              fileName: "app/components/TransactionsTable.tsx",
              lineNumber: 134,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
              ...getTableBodyProps(),
              children: page.map((row) => (prepareRow(row), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
                ...row.getRowProps(),
                children: row.cells.map((cell) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
                  ...cell.getCellProps(),
                  className: "overflow-x-auto",
                  children: cell.render("Cell")
                }, void 0, !1, {
                  fileName: "app/components/TransactionsTable.tsx",
                  lineNumber: 157,
                  columnNumber: 23
                }, this))
              }, void 0, !1, {
                fileName: "app/components/TransactionsTable.tsx",
                lineNumber: 154,
                columnNumber: 17
              }, this)))
            }, void 0, !1, {
              fileName: "app/components/TransactionsTable.tsx",
              lineNumber: 150,
              columnNumber: 11
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/components/TransactionsTable.tsx",
          lineNumber: 133,
          columnNumber: 9
        }, this)
      }, void 0, !1, {
        fileName: "app/components/TransactionsTable.tsx",
        lineNumber: 132,
        columnNumber: 7
      }, this),
      data.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
        className: "my-2 text-center",
        children: "No transactions to display."
      }, void 0, !1, {
        fileName: "app/components/TransactionsTable.tsx",
        lineNumber: 168,
        columnNumber: 29
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "mt-2",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
            className: "p-1 rounded-md bg-lime-600 font-bold text-white cursor-pointer",
            onClick: () => gotoPage(0),
            disabled: !canPreviousPage,
            children: "<<"
          }, void 0, !1, {
            fileName: "app/components/TransactionsTable.tsx",
            lineNumber: 171,
            columnNumber: 9
          }, this),
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
            className: "p-1 rounded-md bg-lime-600 font-bold text-white cursor-pointer",
            onClick: () => previousPage(),
            disabled: !canPreviousPage,
            children: "<"
          }, void 0, !1, {
            fileName: "app/components/TransactionsTable.tsx",
            lineNumber: 178,
            columnNumber: 9
          }, this),
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
            className: "p-1 rounded-md bg-lime-600 font-bold text-white cursor-pointer",
            onClick: () => nextPage(),
            disabled: !canNextPage,
            children: ">"
          }, void 0, !1, {
            fileName: "app/components/TransactionsTable.tsx",
            lineNumber: 185,
            columnNumber: 9
          }, this),
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
            className: "p-1 rounded-md bg-lime-600 font-bold text-white cursor-pointer",
            onClick: () => gotoPage(pageCount - 1),
            disabled: !canNextPage,
            children: ">>"
          }, void 0, !1, {
            fileName: "app/components/TransactionsTable.tsx",
            lineNumber: 192,
            columnNumber: 9
          }, this),
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
            children: [
              "Page",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
                children: [
                  pageIndex + 1,
                  " of ",
                  pageOptions.length
                ]
              }, void 0, !0, {
                fileName: "app/components/TransactionsTable.tsx",
                lineNumber: 201,
                columnNumber: 11
              }, this),
              " "
            ]
          }, void 0, !0, {
            fileName: "app/components/TransactionsTable.tsx",
            lineNumber: 199,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
            children: [
              "| Go to page:",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
                type: "number",
                defaultValue: pageIndex + 1,
                onChange: (e) => {
                  let page2 = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page2);
                },
                style: { width: "60px" },
                className: "border border-lime-600 rounded-md px-1 focus:border-lime-700 outline-none"
              }, void 0, !1, {
                fileName: "app/components/TransactionsTable.tsx",
                lineNumber: 207,
                columnNumber: 11
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/components/TransactionsTable.tsx",
            lineNumber: 205,
            columnNumber: 9
          }, this),
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
            value: pageSize,
            onChange: (e) => {
              setPageSize(Number(e.target.value));
            },
            children: [10, 20, 30, 40, 50].map((pageSize2) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
              value: pageSize2,
              children: [
                "Show ",
                pageSize2
              ]
            }, pageSize2, !0, {
              fileName: "app/components/TransactionsTable.tsx",
              lineNumber: 225,
              columnNumber: 13
            }, this))
          }, void 0, !1, {
            fileName: "app/components/TransactionsTable.tsx",
            lineNumber: 218,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/components/TransactionsTable.tsx",
        lineNumber: 170,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/components/TransactionsTable.tsx",
    lineNumber: 126,
    columnNumber: 5
  }, this);
}
var TransactionsTable = ({ transactions }) => {
  let columns = import_react7.default.useMemo(
    () => [
      {
        Header: "",
        id: "column-transactions",
        columns: [
          {
            Header: "Beneficiary",
            accessor: "beneficiary"
          },
          {
            Header: "Amount",
            accessor: "amount",
            disableFilters: !0,
            Cell: ({ value }) => formatCurrency(value.value, value.currency)
          },
          {
            Header: "Date",
            accessor: "date",
            disableFilters: !0,
            Cell: ({ value }) => formatDate(value)
          },
          {
            Header: "IBAN",
            accessor: "iban"
          }
        ]
      }
    ],
    []
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, {
    columns,
    data: transactions
  }, void 0, !1, {
    fileName: "app/components/TransactionsTable.tsx",
    lineNumber: 276,
    columnNumber: 10
  }, this);
};

// app/components/WalletCard.tsx
var import_classnames3 = __toESM(require("classnames"));
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"), WalletCard = ({
  walletName,
  balance,
  currency,
  active,
  onClick
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
  onClick,
  className: (0, import_classnames3.default)(
    "relative shadow-md rounded-xl p-5 pb-3 w-64 h-32 xl:h-44 cursor-pointer",
    {
      "bg-lime-600 text-white": active,
      "bg-white text-neutral-500": !active
    }
  ),
  children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
      className: "absolute top-3 left-2",
      children: currency
    }, void 0, !1, {
      fileName: "app/components/WalletCard.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
      className: "flex flex-col justify-between h-full",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
          className: "flex items-center justify-center mt-4",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
            children: walletName
          }, void 0, !1, {
            fileName: "app/components/WalletCard.tsx",
            lineNumber: 35,
            columnNumber: 11
          }, this)
        }, void 0, !1, {
          fileName: "app/components/WalletCard.tsx",
          lineNumber: 34,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
          className: "font-bold text-xl",
          children: formatCurrency(balance, currency)
        }, void 0, !1, {
          fileName: "app/components/WalletCard.tsx",
          lineNumber: 37,
          columnNumber: 9
        }, this)
      ]
    }, void 0, !0, {
      fileName: "app/components/WalletCard.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this)
  ]
}, void 0, !0, {
  fileName: "app/components/WalletCard.tsx",
  lineNumber: 21,
  columnNumber: 5
}, this);

// app/providers/DialogProvider.tsx
var import_react8 = require("react");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"), DialogContext = (0, import_react8.createContext)({}), DialogProvider = ({ children }) => {
  let dialogRef = (0, import_react8.useRef)(null), [content, setContent] = (0, import_react8.useState)(null), [replaceUrl, setReplaceUrl] = (0, import_react8.useState)(""), handleOpen = (content2, replace) => {
    replace && setReplaceUrl(replace), dialogRef.current && content2 && (setContent(content2), dialogRef.current.removeAttribute("open"), dialogRef.current.showModal());
  }, handleClose = () => {
    dialogRef.current && (replaceUrl && window.location.replace(replaceUrl), dialogRef.current.close());
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContext.Provider, {
    value: {
      openDialog: handleOpen,
      closeDialog: handleClose
    },
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
        ref: dialogRef,
        content,
        onButtonCloseClick: handleClose
      }, void 0, !1, {
        fileName: "app/providers/DialogProvider.tsx",
        lineNumber: 46,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/providers/DialogProvider.tsx",
    lineNumber: 39,
    columnNumber: 5
  }, this);
};
function useDialog() {
  let context = (0, import_react8.useContext)(DialogContext);
  if (!context)
    throw new Error("Use Dialog must be wrapped in a DialogProvider");
  return context;
}

// app/providers/ToastProvider.tsx
var import_react9 = require("react"), import_react_hot_toast = require("react-hot-toast"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ToastContext = (0, import_react9.createContext)({}), ToastProvider = ({ children }) => {
  let [toastState, setToastState] = (0, import_react9.useState)(null), handleShowToast = (toastMessage) => {
    setToastState(toastMessage);
  };
  return (0, import_react9.useEffect)(() => {
    if (toastState) {
      let { message, type } = toastState;
      switch (type) {
        case "success":
          import_react_hot_toast.toast.success(message);
          break;
        case "error":
          import_react_hot_toast.toast.error(message);
          break;
        default:
          throw new Error(`${type} is not handled`);
      }
      setToastState(null);
    }
  }, [toastState]), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ToastContext.Provider, {
    value: {
      showToast: handleShowToast
    },
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react_hot_toast.Toaster, {
        toastOptions: {
          success: {
            icon: null,
            style: {
              background: "#65a30d",
              color: "#fff",
              fontWeight: "bold"
            }
          },
          error: {
            icon: null,
            style: {
              background: "#b91c1c",
              color: "#fff",
              fontWeight: "bold"
            }
          }
        }
      }, void 0, !1, {
        fileName: "app/providers/ToastProvider.tsx",
        lineNumber: 51,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/providers/ToastProvider.tsx",
    lineNumber: 45,
    columnNumber: 5
  }, this);
};
function useToast() {
  let context = (0, import_react9.useContext)(ToastContext);
  if (!context)
    throw new Error("Use Toast must be wrapped in a ToastProvider");
  return context;
}

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-FIEHU44U.css";

// app/root.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"), meta = () => ({
  charset: "utf-8",
  title: "GomBank",
  viewport: "width=device-width,initial-scale=1"
}), links = () => [{ rel: "stylesheet", href: tailwind_default }];
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
    lang: "en",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react10.Meta, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 20,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react10.Links, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 21,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 19,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 24,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ToastProvider, {
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogProvider, {
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react10.Outlet, {}, void 0, !1, {
                fileName: "app/root.tsx",
                lineNumber: 27,
                columnNumber: 13
              }, this)
            }, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 26,
              columnNumber: 11
            }, this)
          }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 25,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react10.ScrollRestoration, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 31,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react10.Scripts, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 32,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react10.LiveReload, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 33,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 23,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

// app/routes/api/addTransaction.ts
var addTransaction_exports = {};
__export(addTransaction_exports, {
  action: () => action
});
var import_node = require("@remix-run/node"), import_fs = __toESM(require("fs")), import_path = __toESM(require("path"));

// app/utils/uuid.server.ts
var import_uuidv4 = require("uuidv4"), randomId = () => (0, import_uuidv4.uuid)();

// app/routes/api/addTransaction.ts
var action = async ({ request }) => {
  let body = await request.json();
  try {
    let dbFile = await import_fs.default.promises.readFile(import_path.default.resolve(`${__dirname}/../app/db/db.json`), {
      encoding: "utf8"
    }), db = JSON.parse(dbFile), users = db.users, { accountNumber, walletId, beneficiary, iban, currency, amount, amountToDebit } = body, user = users.find((user2) => user2.accountNumber === accountNumber);
    if (user) {
      let newUser = { ...user }, userWallets = newUser.wallets, wallet = userWallets == null ? void 0 : userWallets.find((w) => w.id === walletId), walletIndex = (userWallets == null ? void 0 : userWallets.findIndex((w) => w.id === walletId)) ?? -1;
      if (wallet) {
        let walletTransactions = wallet.transactions ? [...wallet.transactions] : [], newTransaction = {
          id: randomId(),
          beneficiary,
          amount: {
            value: amount,
            currency
          },
          date: new Date().toISOString(),
          iban
        };
        walletTransactions.push(newTransaction), wallet.balance = wallet.balance - amountToDebit;
        let currentWallets = db.users[db.users.indexOf(user)].wallets;
        currentWallets && walletIndex !== -1 && (currentWallets[walletIndex].transactions = walletTransactions);
      }
      let newDB = JSON.stringify(db, null, 2);
      try {
        await import_fs.default.promises.writeFile(import_path.default.resolve(`${__dirname}/../app/db/db.json`), newDB);
      } catch (err) {
        console.log("\u{1F680} ~ const:ActionFunction= ~ err", err);
      }
      return (0, import_node.json)({ user: newUser });
    } else
      return (0, import_node.json)({ error: "User not found" });
  } catch {
    return (0, import_node.json)({ error: "Unknown error!" });
  }
};

// app/routes/api/user/$userId.ts
var userId_exports = {};
__export(userId_exports, {
  loader: () => loader
});
var import_node2 = require("@remix-run/node"), import_fs2 = __toESM(require("fs")), import_path2 = __toESM(require("path")), loader = async ({ params }) => {
  try {
    let dbFile = await import_fs2.default.promises.readFile(import_path2.default.resolve(`${__dirname}/../app/db/db.json`), {
      encoding: "utf8"
    }), users = JSON.parse(dbFile).users, userId = params.userId, user = users.find((user2) => user2.id === userId);
    if (user) {
      let foundUser = { ...user, password: void 0 };
      return (0, import_node2.json)({ user: foundUser });
    } else
      return (0, import_node2.json)({ error: "User not found" });
  } catch (err) {
    return (0, import_node2.json)({ error: "Unknown error!", err });
  }
};

// app/routes/api/addWallet.ts
var addWallet_exports = {};
__export(addWallet_exports, {
  action: () => action2
});
var import_node3 = require("@remix-run/node"), import_fs3 = __toESM(require("fs")), import_path3 = __toESM(require("path"));
var action2 = async ({ request }) => {
  let body = await request.json();
  try {
    let dbFile = await import_fs3.default.promises.readFile(import_path3.default.resolve(`${__dirname}/../app/db/db.json`), {
      encoding: "utf8"
    }), db = JSON.parse(dbFile), users = db.users, { name, currency, accountNumber } = body, user = users.find((user2) => user2.accountNumber === accountNumber);
    if (user) {
      let newUser = { ...user }, userWallets = newUser.wallets, newWallet = {
        id: randomId(),
        name,
        currency,
        balance: 1e4,
        transactions: []
      };
      userWallets == null || userWallets.push(newWallet), newUser.wallets = userWallets, db.users[db.users.indexOf(user)] = newUser;
      let newDB = JSON.stringify(db, null, 2);
      try {
        await import_fs3.default.promises.writeFile(import_path3.default.resolve(`${__dirname}/../app/db/db.json`), newDB);
      } catch (err) {
        console.log("\u{1F680} ~ const:ActionFunction= ~ err", err);
      }
      return (0, import_node3.json)({ user: newUser });
    } else
      return (0, import_node3.json)({ error: "User not found" });
  } catch {
    return (0, import_node3.json)({ error: "Unknown error!" });
  }
};

// app/routes/api/login.ts
var login_exports = {};
__export(login_exports, {
  action: () => action3
});
var import_node4 = require("@remix-run/node"), import_fs4 = __toESM(require("fs")), import_path4 = __toESM(require("path")), action3 = async ({ request }) => {
  let body = await request.json();
  try {
    let dbFile = await import_fs4.default.promises.readFile(import_path4.default.resolve(`${__dirname}/../app/db/db.json`), {
      encoding: "utf8"
    }), users = JSON.parse(dbFile).users, { accountNumber, password } = body, user = users.find((user2) => user2.accountNumber === accountNumber);
    if (user && user.password === password) {
      let foundUser = { ...user, password: void 0 };
      return (0, import_node4.json)({ user: foundUser });
    } else
      return (0, import_node4.json)({ error: "Account not found or incorrect password!" });
  } catch {
    return (0, import_node4.json)({ error: "Unknown error!" });
  }
};

// app/routes/dashboard.tsx
var dashboard_exports = {};
__export(dashboard_exports, {
  default: () => Dashboard
});
var import_react11 = require("@remix-run/react");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function Dashboard() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    className: "h-full min-h-screen flex bg-neutral-500",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sidebar, {
        sidebarTitle: "GomBank",
        items: [
          {
            id: "dashboard",
            title: "Dashboard",
            to: "/dashboard/"
          },
          {
            id: "my-wallets",
            title: "My Wallets",
            to: "/dashboard/my-wallets"
          },
          {
            id: "transfer",
            title: "Transfer",
            to: "/dashboard/transfer"
          },
          {
            id: "sign-out",
            title: "Sign Out",
            to: "/sign-out"
          }
        ]
      }, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 7,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react11.Outlet, {}, void 0, !1, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 32,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/transfer/index.tsx
var transfer_exports = {};
__export(transfer_exports, {
  action: () => action4,
  default: () => Transfer,
  loader: () => loader2
});
var import_react12 = require("@remix-run/react"), import_react13 = require("react");
var import_node7 = require("@remix-run/node"), import_react14 = require("react"), import_react_currency_input_field = __toESM(require("react-currency-input-field"));

// app/session.ts
var import_node6 = require("@remix-run/node");

// app/utils/session.server.ts
var import_node5 = require("@remix-run/node");
async function login({ accountNumber, password }) {
  let response = await (await fetch(`${process.env.APP_URL}/api/login`, {
    method: "POST",
    body: JSON.stringify({ accountNumber, password }),
    headers: {
      "Content-Type": "application/json"
    }
  })).json();
  if (!response)
    throw Error("Unknown error");
  return response;
}
var storage = (0, import_node5.createCookieSessionStorage)({
  cookie: {
    name: "GomBank_session_new",
    secure: !1,
    secrets: ["gombank123123123"],
    sameSite: "lax",
    path: "/",
    maxAge: 12600,
    httpOnly: !0
  }
});
async function logout(request) {
  let session = await getUserSession(request);
  return (0, import_node5.redirect)("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
}
function getUserSession(request) {
  return storage.getSession(request.headers.get("cookie"));
}
async function createUserSession(userId, redirectTo) {
  let session = await storage.getSession();
  return session.set("userId", userId), session.set("token", "FAKE_USER_TOKEN"), (0, import_node5.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1e3)
      })
    }
  });
}

// app/session.ts
async function requireUserSession(request) {
  let session = await getUserSession(request);
  if (!session.has("userId"))
    throw (0, import_node6.redirect)("/");
  return session;
}

// app/routes/dashboard/transfer/index.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"), action4 = async ({ request }) => {
  var _a, _b;
  try {
    let formData = await request.formData(), currency = (_a = formData.get("currency")) == null ? void 0 : _a.toString(), rate = (_b = formData.get("rate")) == null ? void 0 : _b.toString(), rates = await (await fetch(
      `${process.env.EXCHANGE_RATES_API_URL}/${currency}/${rate}.json`,
      {
        method: "GET"
      }
    )).json();
    return (0, import_node7.json)({
      rates
    });
  } catch (err) {
    return console.log("\u{1F680} ~ fetchRates ~ err", err), (0, import_node7.json)({ rates: null });
  }
};
async function loader2({ request }) {
  let session = await requireUserSession(request), userInfoRequest = await fetch(`${process.env.APP_URL}/api/user/${session.get("userId")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.get("token")
    }
  }), { user } = await userInfoRequest.json(), currencies = await (await fetch(`${process.env.EXCHANGE_RATES_API_URL}.min.json`, {
    method: "GET"
  })).json(), currencyMap = Object.keys(currencies);
  return (0, import_node7.json)({
    user,
    currencies: currencyMap
  });
}
function Transfer() {
  var _a;
  let { user, currencies } = (0, import_react12.useLoaderData)(), [selectedWallet, setSelectedWallet] = (0, import_react13.useState)(user.wallets[0] || null), [selectedCurrency, setSelectedCurrency] = (0, import_react13.useState)("eur"), [amount, setAmount] = (0, import_react13.useState)(""), fetcher = (0, import_react12.useFetcher)(), rates = (_a = fetcher.data) == null ? void 0 : _a.rates, isExchange = (0, import_react14.useMemo)(() => amount && Number(amount) > 0 && selectedWallet && selectedWallet.currency.toLowerCase() !== selectedCurrency, [amount, selectedCurrency, selectedWallet]), currentRate = (0, import_react14.useMemo)(() => (rates == null ? void 0 : rates[selectedCurrency]) ?? 0, [rates, selectedCurrency]), getExchangeRate = (0, import_react13.useCallback)(
    (amount2) => {
      if (currentRate && amount2) {
        let numberAmount = parseFloat(amount2), numberRate = parseFloat(currentRate);
        return numberAmount / numberRate;
      }
      return 1;
    },
    [currentRate]
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    className: "content p-6",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
        className: "font-bold text-white text-2xl mb-4",
        children: "Transfer"
      }, void 0, !1, {
        fileName: "app/routes/dashboard/transfer/index.tsx",
        lineNumber: 101,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "mt-2 w-full rounded-xl p-5 bg-white min-h-[300px] min-w-[380px]",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react12.Form, {
          action: "/dashboard/transfer/send",
          method: "post",
          onSubmit: (e) => {
            amount && Number(amount) <= 0 && e.preventDefault();
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
              className: "mb-2",
              children: "Select the wallet"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 113,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
              name: "wallet",
              items: user.wallets.map((item) => ({
                id: item.id,
                value: item.name
              })),
              onChange: (value) => {
                let wallet = user.wallets.find((wallet2) => wallet2.name === value);
                wallet && (setSelectedWallet(wallet), fetcher.submit(
                  {
                    currency: wallet.currency.toLowerCase(),
                    rate: selectedCurrency
                  },
                  { method: "post" }
                ));
              }
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 114,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
              type: "hidden",
              name: "walletId",
              value: selectedWallet.id
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 134,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
              type: "hidden",
              name: "accountNumber",
              value: user.accountNumber
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 135,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
              type: "hidden",
              name: "amountToDebit",
              value: isExchange ? getExchangeRate(amount) : amount
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 136,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
              className: "mt-2 mb-1",
              children: [
                "Balance: ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
                  children: formatCurrency(selectedWallet.balance, selectedWallet.currency)
                }, void 0, !1, {
                  fileName: "app/routes/dashboard/transfer/index.tsx",
                  lineNumber: 142,
                  columnNumber: 22
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 141,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
              type: "hidden",
              name: "balance",
              value: selectedWallet.balance
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 144,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
              type: "hidden",
              name: "amount",
              value: isExchange ? getExchangeRate(amount) : amount
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 145,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
              className: "mt-2 mb-1",
              children: "Beneficiary name"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 150,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
              placeholder: "Beneficiary name",
              name: "beneficiary",
              required: !0,
              className: "flex h-10 w-full cursor-default items-center justify-between gap-1 whitespace-no-wrap rounded-md pl-4 pr-4 text-base leading-6 shadow-md border border-neutral-200 outline-none focus:border-lime-600"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 151,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
              className: "mt-2 mb-1",
              children: "IBAN"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 157,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
              placeholder: "IBAN",
              name: "iban",
              maxLength: 20,
              required: !0,
              pattern: "[A-Z]{2}\\d{13,32}|(?=.{18,42}$)[A-Z]{2}\\d{2}( )(\\d{4}\\1){2,7}\\d{1,4}",
              className: "flex h-10 w-full cursor-default items-center justify-between gap-1 whitespace-no-wrap rounded-md pl-4 pr-4 text-base leading-6 shadow-md border border-neutral-200 outline-none focus:border-lime-600"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 158,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
              className: "mt-2 mb-1",
              children: "Amount"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 166,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
              className: "flex items-center",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react_currency_input_field.default, {
                  required: !0,
                  autoComplete: "off",
                  className: "flex h-10 w-full cursor-default items-center justify-between gap-1 whitespace-no-wrap rounded-md pl-4 pr-4 text-base leading-6 shadow-md border border-neutral-200 outline-none focus:border-lime-600",
                  placeholder: "Enter an amount",
                  decimalsLimit: 2,
                  onValueChange: (value, name) => value && setAmount(value),
                  value: amount
                }, void 0, !1, {
                  fileName: "app/routes/dashboard/transfer/index.tsx",
                  lineNumber: 168,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                  className: "ml-2",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
                    name: "currency",
                    items: (currencies == null ? void 0 : currencies.map((currency) => ({
                      id: currency,
                      value: currency.toUpperCase()
                    }))) ?? [],
                    defaultValue: {
                      id: selectedWallet.currency.toLowerCase(),
                      value: selectedWallet.currency
                    },
                    onChange: (value) => {
                      setSelectedCurrency(value.toLowerCase()), fetcher.submit(
                        {
                          currency: selectedWallet.currency.toLowerCase(),
                          rate: value.toLowerCase()
                        },
                        { method: "post" }
                      );
                    }
                  }, void 0, !1, {
                    fileName: "app/routes/dashboard/transfer/index.tsx",
                    lineNumber: 178,
                    columnNumber: 15
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/dashboard/transfer/index.tsx",
                  lineNumber: 177,
                  columnNumber: 13
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 167,
              columnNumber: 11
            }, this),
            amount && fetcher.state !== "idle" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
              className: "mt-2 mb-1",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
                children: "Loading rates..."
              }, void 0, !1, {
                fileName: "app/routes/dashboard/transfer/index.tsx",
                lineNumber: 205,
                columnNumber: 15
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 204,
              columnNumber: 13
            }, this),
            isExchange && amount && fetcher.state === "idle" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
              className: "mt-2 mb-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
                  children: [
                    "You will pay:",
                    " ",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
                      children: formatCurrency(getExchangeRate(amount), selectedWallet.currency)
                    }, void 0, !1, {
                      fileName: "app/routes/dashboard/transfer/index.tsx",
                      lineNumber: 212,
                      columnNumber: 17
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/dashboard/transfer/index.tsx",
                  lineNumber: 210,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
                  children: [
                    "Beneficiary will receive:",
                    " ",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
                      children: formatCurrency(parseFloat(amount), selectedCurrency)
                    }, void 0, !1, {
                      fileName: "app/routes/dashboard/transfer/index.tsx",
                      lineNumber: 216,
                      columnNumber: 17
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/dashboard/transfer/index.tsx",
                  lineNumber: 214,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
                  className: "mt-1",
                  children: "Current rates:"
                }, void 0, !1, {
                  fileName: "app/routes/dashboard/transfer/index.tsx",
                  lineNumber: 218,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
                  children: [
                    "1 ",
                    selectedWallet.currency,
                    " = ",
                    currentRate,
                    " ",
                    selectedCurrency.toUpperCase()
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/dashboard/transfer/index.tsx",
                  lineNumber: 219,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
                  className: "mt-1",
                  children: `Date of this rate: ${rates == null ? void 0 : rates.date}`
                }, void 0, !1, {
                  fileName: "app/routes/dashboard/transfer/index.tsx",
                  lineNumber: 222,
                  columnNumber: 15
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 209,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
              disabled: amount ? Number(amount) <= 0 : !0,
              className: "mt-4",
              type: "submit",
              children: "Send"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/transfer/index.tsx",
              lineNumber: 226,
              columnNumber: 11
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/dashboard/transfer/index.tsx",
          lineNumber: 104,
          columnNumber: 9
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/dashboard/transfer/index.tsx",
        lineNumber: 103,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/dashboard/transfer/index.tsx",
    lineNumber: 100,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/transfer/send.tsx
var send_exports = {};
__export(send_exports, {
  action: () => action5
});
var import_node8 = require("@remix-run/node");
async function action5({ request }) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  let formData = await request.formData(), walletId = (_a = formData.get("walletId")) == null ? void 0 : _a.toString(), beneficiary = (_b = formData.get("beneficiary")) == null ? void 0 : _b.toString(), accountNumber = (_c = formData.get("accountNumber")) == null ? void 0 : _c.toString(), balance = (_d = formData.get("balance")) == null ? void 0 : _d.toString(), iban = (_e = formData.get("iban")) == null ? void 0 : _e.toString(), amount = (_f = formData.get("amount")) == null ? void 0 : _f.toString(), amountToDebit = (_g = formData.get("amountToDebit")) == null ? void 0 : _g.toString(), currency = (_h = formData.get("currency")) == null ? void 0 : _h.toString();
  if (Number(amount) > Number(balance))
    return (0, import_node8.redirect)("/dashboard/transfer?error=true");
  try {
    await fetch(`${process.env.APP_URL}/api/addTransaction`, {
      method: "POST",
      body: JSON.stringify({
        accountNumber,
        walletId,
        beneficiary,
        iban,
        amount,
        amountToDebit,
        currency
      }),
      headers: { "Content-Type": "application/json" }
    });
  } catch {
    return (0, import_node8.redirect)("/dashboard/transfer?error=true");
  }
  return (0, import_node8.redirect)("/dashboard?receipt=true");
}

// app/routes/dashboard/my-wallets.tsx
var my_wallets_exports = {};
__export(my_wallets_exports, {
  action: () => action6,
  default: () => MyWallets,
  loader: () => loader3
});
var import_node9 = require("@remix-run/node"), import_react15 = require("@remix-run/react"), import_react16 = require("react");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime");
async function loader3({ request }) {
  let currencies = await (await fetch(`${process.env.EXCHANGE_RATES_API_URL}.min.json`, {
    method: "GET"
  })).json(), currencyMap = Object.keys(currencies), session = await requireUserSession(request), userInfoRequest = await fetch(`${process.env.APP_URL}/api/user/${session.get("userId")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.get("token")
    }
  }), { user } = await userInfoRequest.json();
  return {
    user,
    currencies: currencyMap
  };
}
async function action6({ request }) {
  var _a, _b, _c;
  let formData = await request.formData(), walletName = (_a = formData.get("walletName")) == null ? void 0 : _a.toString(), currency = (_b = formData.get("currency")) == null ? void 0 : _b.toString(), accountNumber = (_c = formData.get("accountNumber")) == null ? void 0 : _c.toString();
  try {
    return await fetch(`${process.env.APP_URL}/api/addWallet`, {
      method: "POST",
      body: JSON.stringify({
        name: walletName,
        currency,
        accountNumber
      }),
      headers: { "Content-Type": "application/json" }
    }), (0, import_node9.json)({
      success: !0,
      message: "Wallet added successfully"
    });
  } catch (err) {
    return (0, import_node9.json)({
      success: !1,
      message: "Error addind wallet!" + err.message
    });
  }
}
var DialogContent = ({
  currencies,
  accountNumber,
  closeDialog
}) => {
  let transition = (0, import_react15.useTransition)(), formRef = (0, import_react16.useRef)(null), isAdding = transition.state === "submitting";
  return (0, import_react16.useEffect)(() => {
    var _a;
    isAdding || (_a = formRef.current) == null || _a.reset();
  }, [isAdding]), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    className: "w-full flex flex-col items-center justify-center pt-4",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
        className: "text-center font-bold text-xl  mb-6",
        children: "Add a new Wallet"
      }, void 0, !1, {
        fileName: "app/routes/dashboard/my-wallets.tsx",
        lineNumber: 83,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react15.Form, {
        ref: formRef,
        onSubmit: () => {
          closeDialog();
        },
        action: "/dashboard/my-wallets/",
        method: "post",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
                className: "text-left  mb-0.5",
                children: "Wallet Name"
              }, void 0, !1, {
                fileName: "app/routes/dashboard/my-wallets.tsx",
                lineNumber: 93,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
                className: "flex h-10 w-64 cursor-default items-center justify-between gap-1 whitespace-no-wrap rounded-md pl-4 pr-4 text-base leading-6 shadow-md border border-neutral-200 outline-none focus:border-lime-600",
                type: "text",
                name: "walletName",
                required: !0,
                minLength: 2,
                placeholder: "Wallet Name"
              }, void 0, !1, {
                fileName: "app/routes/dashboard/my-wallets.tsx",
                lineNumber: 94,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
                type: "hidden",
                name: "accountNumber",
                value: accountNumber
              }, void 0, !1, {
                fileName: "app/routes/dashboard/my-wallets.tsx",
                lineNumber: 102,
                columnNumber: 11
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/dashboard/my-wallets.tsx",
            lineNumber: 92,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "w-64 mt-2",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
                className: "text-left  mb-0.5",
                children: "Currency"
              }, void 0, !1, {
                fileName: "app/routes/dashboard/my-wallets.tsx",
                lineNumber: 105,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
                name: "currency",
                items: (currencies == null ? void 0 : currencies.map((currency) => ({
                  id: currency,
                  value: currency.toUpperCase()
                }))) ?? [],
                defaultValue: {
                  id: "eur",
                  value: "EUR"
                }
              }, void 0, !1, {
                fileName: "app/routes/dashboard/my-wallets.tsx",
                lineNumber: 106,
                columnNumber: 11
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/dashboard/my-wallets.tsx",
            lineNumber: 104,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
            type: "submit",
            className: "mt-4",
            children: "Add Wallet"
          }, void 0, !1, {
            fileName: "app/routes/dashboard/my-wallets.tsx",
            lineNumber: 120,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/dashboard/my-wallets.tsx",
        lineNumber: 84,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/dashboard/my-wallets.tsx",
    lineNumber: 82,
    columnNumber: 5
  }, this);
};
function MyWallets() {
  let { user, currencies } = (0, import_react15.useLoaderData)(), data = (0, import_react15.useActionData)(), { openDialog, closeDialog } = useDialog(), { showToast } = useToast(), [selectedWallet, setSelectedWallet] = (0, import_react16.useState)(user.wallets[0] || null);
  (0, import_react16.useEffect)(() => {
    data && (data.success ? showToast({ type: "success", message: data.message }) : data.success === !1 && showToast({ type: "error", message: data.message }));
  }, [data]);
  let handleAddWallet = () => {
    openDialog(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
        closeDialog,
        currencies,
        accountNumber: user.accountNumber
      }, void 0, !1, {
        fileName: "app/routes/dashboard/my-wallets.tsx",
        lineNumber: 149,
        columnNumber: 7
      }, this)
    );
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    className: "content p-6",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
        className: "font-bold text-white text-2xl mb-4",
        children: "My Wallets"
      }, void 0, !1, {
        fileName: "app/routes/dashboard/my-wallets.tsx",
        lineNumber: 159,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "mt-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full ",
        children: [
          user.wallets.map((wallet) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WalletCard, {
            walletName: wallet.name,
            balance: wallet.balance,
            currency: wallet.currency,
            active: selectedWallet.id === wallet.id,
            onClick: () => {
              setSelectedWallet(wallet);
            }
          }, wallet.id, !1, {
            fileName: "app/routes/dashboard/my-wallets.tsx",
            lineNumber: 163,
            columnNumber: 11
          }, this)),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "relative flex flex-col items-center justify-center shadow-md rounded-xl p-5 pb-3 w-64 h-32 xl:h-44 cursor-pointer bg-white",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
              onClick: () => {
                handleAddWallet();
              },
              children: "Add new Wallet"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/my-wallets.tsx",
              lineNumber: 175,
              columnNumber: 11
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/dashboard/my-wallets.tsx",
            lineNumber: 174,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/dashboard/my-wallets.tsx",
        lineNumber: 161,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
        className: "text-white mt-2 text-lg font-bold",
        children: "Transactions"
      }, void 0, !1, {
        fileName: "app/routes/dashboard/my-wallets.tsx",
        lineNumber: 184,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "mt-2 w-full rounded-xl p-5 bg-white min-h-[300px]",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TransactionsTable, {
          transactions: (selectedWallet == null ? void 0 : selectedWallet.transactions) ?? []
        }, void 0, !1, {
          fileName: "app/routes/dashboard/my-wallets.tsx",
          lineNumber: 186,
          columnNumber: 9
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/dashboard/my-wallets.tsx",
        lineNumber: 185,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/dashboard/my-wallets.tsx",
    lineNumber: 158,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/index.tsx
var dashboard_exports2 = {};
__export(dashboard_exports2, {
  default: () => DashboardIndex,
  loader: () => loader4
});
var import_node10 = require("@remix-run/node"), import_react17 = require("@remix-run/react"), import_react18 = require("react");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime");
async function loader4({ request }) {
  let url = new URL(request.url), receipt = url.searchParams.get("receipt"), error = url.searchParams.get("error"), session = await requireUserSession(request), userInfoRequest = await fetch(`${process.env.APP_URL}/api/user/${session.get("userId")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.get("token")
    }
  }), { user } = await userInfoRequest.json();
  return (0, import_node10.json)({
    user,
    receipt,
    error
  });
}
var ReceiptDialog = ({
  transaction,
  closeDialog
}) => transaction ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
  className: "w-full flex flex-col items-center justify-center pt-4",
  children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
      className: "text-center font-bold text-xl mb-6",
      children: "Receipt of your Transfer"
    }, void 0, !1, {
      fileName: "app/routes/dashboard/index.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
      className: "text-left",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
              children: "Transaction ID:"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/index.tsx",
              lineNumber: 72,
              columnNumber: 11
            }, this),
            " ",
            transaction.id
          ]
        }, void 0, !0, {
          fileName: "app/routes/dashboard/index.tsx",
          lineNumber: 71,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
              children: "Beneficiary:"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/index.tsx",
              lineNumber: 75,
              columnNumber: 11
            }, this),
            " ",
            transaction.beneficiary
          ]
        }, void 0, !0, {
          fileName: "app/routes/dashboard/index.tsx",
          lineNumber: 74,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
              children: "IBAN:"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/index.tsx",
              lineNumber: 78,
              columnNumber: 11
            }, this),
            " ",
            transaction.iban
          ]
        }, void 0, !0, {
          fileName: "app/routes/dashboard/index.tsx",
          lineNumber: 77,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
              children: "Amount:"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/index.tsx",
              lineNumber: 81,
              columnNumber: 11
            }, this),
            " ",
            transaction.amount.value,
            " ",
            transaction.amount.currency
          ]
        }, void 0, !0, {
          fileName: "app/routes/dashboard/index.tsx",
          lineNumber: 80,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
              children: "Date:"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/index.tsx",
              lineNumber: 84,
              columnNumber: 11
            }, this),
            " ",
            transaction.date
          ]
        }, void 0, !0, {
          fileName: "app/routes/dashboard/index.tsx",
          lineNumber: 83,
          columnNumber: 9
        }, this)
      ]
    }, void 0, !0, {
      fileName: "app/routes/dashboard/index.tsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
      className: "mt-2",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
        onClick: () => {
          window.location.replace("/dashboard/"), closeDialog();
        },
        children: "Close"
      }, void 0, !1, {
        fileName: "app/routes/dashboard/index.tsx",
        lineNumber: 88,
        columnNumber: 9
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/dashboard/index.tsx",
      lineNumber: 87,
      columnNumber: 7
    }, this)
  ]
}, void 0, !0, {
  fileName: "app/routes/dashboard/index.tsx",
  lineNumber: 67,
  columnNumber: 5
}, this) : null;
function DashboardIndex() {
  let { user, receipt, error } = (0, import_react17.useLoaderData)(), { openDialog, closeDialog } = useDialog(), { showToast } = useToast(), allTransactions = user.wallets.flatMap((info) => info.transactions).filter(Boolean), lastTransaction = allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  return (0, import_react18.useEffect)(() => {
    receipt ? (openDialog(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReceiptDialog, {
        closeDialog,
        transaction: lastTransaction
      }, void 0, !1, {
        fileName: "app/routes/dashboard/index.tsx",
        lineNumber: 114,
        columnNumber: 9
      }, this),
      "/dashboard/"
    ), showToast({ type: "success", message: "Transfer completed sucessfully!" })) : error && showToast({ type: "error", message: "Your transfer was not suceeded! Try again later." });
  }, [receipt, error]), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    className: "content p-6",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
        className: "font-bold text-white text-2xl mb-4",
        children: "Dashboard"
      }, void 0, !1, {
        fileName: "app/routes/dashboard/index.tsx",
        lineNumber: 126,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "bg-white rounded-xl p-5 drop-shadow-lg mb-4",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
            className: "font-bold",
            children: "Overview"
          }, void 0, !1, {
            fileName: "app/routes/dashboard/index.tsx",
            lineNumber: 128,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
            children: [
              "Name: ",
              user == null ? void 0 : user.name
            ]
          }, void 0, !0, {
            fileName: "app/routes/dashboard/index.tsx",
            lineNumber: 129,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
            children: [
              "Account: ",
              user == null ? void 0 : user.accountNumber
            ]
          }, void 0, !0, {
            fileName: "app/routes/dashboard/index.tsx",
            lineNumber: 130,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/dashboard/index.tsx",
        lineNumber: 127,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "bg-white rounded-xl p-5 drop-shadow-lg",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
            className: "font-bold",
            children: "Recent transactions:"
          }, void 0, !1, {
            fileName: "app/routes/dashboard/index.tsx",
            lineNumber: 133,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TransactionsTable, {
            transactions: allTransactions
          }, void 0, !1, {
            fileName: "app/routes/dashboard/index.tsx",
            lineNumber: 134,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/dashboard/index.tsx",
        lineNumber: 132,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/dashboard/index.tsx",
    lineNumber: 125,
    columnNumber: 5
  }, this);
}

// app/routes/sign-out.tsx
var sign_out_exports = {};
__export(sign_out_exports, {
  loader: () => loader5
});
var import_fs5 = __toESM(require("fs")), import_path5 = __toESM(require("path"));
async function resetDatabase() {
  let dbFile = await import_fs5.default.promises.readFile(import_path5.default.resolve(`${__dirname}/../app/db/db.json`), {
    encoding: "utf8"
  }), seedFile = await import_fs5.default.promises.readFile(import_path5.default.resolve(`${__dirname}/../app/db/seed.json`), {
    encoding: "utf8"
  });
  dbFile && seedFile && await import_fs5.default.promises.writeFile(import_path5.default.resolve(`${__dirname}/../app/db/db.json`), seedFile);
}
var loader5 = async ({ request }) => {
  try {
    await resetDatabase();
  } catch (err) {
    console.log(err);
  }
  return logout(request);
};

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  action: () => action7,
  default: () => Index,
  loader: () => loader6
});
var import_node11 = require("@remix-run/node"), import_react19 = require("@remix-run/react"), import_react20 = require("react");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function validateUrl(url) {
  return console.log(url), ["/", "/login"].includes(url) ? url : "/dashboard";
}
var action7 = async ({ request }) => {
  var _a, _b;
  let formData = await request.formData(), accountNumber = (_a = formData.get("accountNumber")) == null ? void 0 : _a.toString(), password = (_b = formData.get("password")) == null ? void 0 : _b.toString(), redirectTo = validateUrl(formData.get("redirectTo") || "/dashboard");
  if (!accountNumber || !password)
    return null;
  let data = await login({ accountNumber, password });
  return !data || data.error ? (0, import_node11.json)(
    {
      error: (data == null ? void 0 : data.error) || "Invalid credentials"
    },
    { status: 401 }
  ) : createUserSession(data.user.id, redirectTo);
};
async function loader6({ request }) {
  let session = await getUserSession(request);
  return session && session.has("userId") ? (0, import_node11.redirect)("/dashboard") : null;
}
function Index() {
  let data = (0, import_react19.useActionData)(), transition = (0, import_react19.useTransition)(), { showToast } = useToast(), loading = transition.state === "loading";
  return (0, import_react20.useEffect)(() => {
    data && data.error && showToast({ type: "error", message: "Error: " + data.error });
  }, [data]), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    className: "min-h-screen flex flex-col items-center justify-center bg-neutral-500",
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
      className: "flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
          className: "font-medium self-center text-xl sm:text-2xl uppercase text-gray-800",
          children: "Login To Your Account"
        }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 68,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
          className: "mt-10",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react19.Form, {
            method: "post",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                className: "flex flex-col mb-6",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
                    htmlFor: "accountNumber",
                    className: "mb-1 text-xs sm:text-sm tracking-wide text-gray-600",
                    children: "Account Number:"
                  }, void 0, !1, {
                    fileName: "app/routes/index.tsx",
                    lineNumber: 75,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
                    id: "accountNumber",
                    type: "number",
                    name: "accountNumber",
                    className: "text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-neutral-700",
                    placeholder: "Account Number"
                  }, void 0, !1, {
                    fileName: "app/routes/index.tsx",
                    lineNumber: 81,
                    columnNumber: 15
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/index.tsx",
                lineNumber: 74,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                className: "flex flex-col mb-6",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
                    htmlFor: "password",
                    className: "mb-1 text-xs sm:text-sm tracking-wide text-gray-600",
                    children: "Password:"
                  }, void 0, !1, {
                    fileName: "app/routes/index.tsx",
                    lineNumber: 90,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
                    id: "password",
                    type: "password",
                    name: "password",
                    className: "text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-neutral-700",
                    placeholder: "Password"
                  }, void 0, !1, {
                    fileName: "app/routes/index.tsx",
                    lineNumber: 96,
                    columnNumber: 15
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/index.tsx",
                lineNumber: 89,
                columnNumber: 13
              }, this),
              loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                className: "w-full mt-12 text-neutral-500 text-center font-bold",
                children: "Loading..."
              }, void 0, !1, {
                fileName: "app/routes/index.tsx",
                lineNumber: 106,
                columnNumber: 15
              }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
                type: "submit",
                className: "w-full mt-12",
                children: "Login"
              }, void 0, !1, {
                fileName: "app/routes/index.tsx",
                lineNumber: 108,
                columnNumber: 15
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/index.tsx",
            lineNumber: 73,
            columnNumber: 11
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 72,
          columnNumber: 9
        }, this)
      ]
    }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 67,
      columnNumber: 7
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 66,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "c2b18749", entry: { module: "/build/entry.client-SPD75E36.js", imports: ["/build/_shared/chunk-BAVFUAKX.js", "/build/_shared/chunk-3XAES7OG.js", "/build/_shared/chunk-5KL4PAQL.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-V5DLISYT.js", imports: ["/build/_shared/chunk-KR3P4JEN.js", "/build/_shared/chunk-N5HHEF7V.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/addTransaction": { id: "routes/api/addTransaction", parentId: "root", path: "api/addTransaction", index: void 0, caseSensitive: void 0, module: "/build/routes/api/addTransaction-ACCVB2KK.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/addWallet": { id: "routes/api/addWallet", parentId: "root", path: "api/addWallet", index: void 0, caseSensitive: void 0, module: "/build/routes/api/addWallet-OY2LSQEM.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/login": { id: "routes/api/login", parentId: "root", path: "api/login", index: void 0, caseSensitive: void 0, module: "/build/routes/api/login-VDW3FKCY.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/user/$userId": { id: "routes/api/user/$userId", parentId: "root", path: "api/user/:userId", index: void 0, caseSensitive: void 0, module: "/build/routes/api/user/$userId-7J36IHRB.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard": { id: "routes/dashboard", parentId: "root", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard-3S55CPTD.js", imports: ["/build/_shared/chunk-LM7JCF3Z.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/index": { id: "routes/dashboard/index", parentId: "routes/dashboard", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/index-UYOX2WU3.js", imports: ["/build/_shared/chunk-PLVBHP7V.js", "/build/_shared/chunk-KR3P4JEN.js", "/build/_shared/chunk-N5HHEF7V.js", "/build/_shared/chunk-WJQUQ2OE.js", "/build/_shared/chunk-BDH4CQ6Z.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/my-wallets": { id: "routes/dashboard/my-wallets", parentId: "routes/dashboard", path: "my-wallets", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/my-wallets-PILWLQNT.js", imports: ["/build/_shared/chunk-PLVBHP7V.js", "/build/_shared/chunk-KR3P4JEN.js", "/build/_shared/chunk-N5HHEF7V.js", "/build/_shared/chunk-4DWC5HXV.js", "/build/_shared/chunk-WJQUQ2OE.js", "/build/_shared/chunk-BDH4CQ6Z.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/transfer/index": { id: "routes/dashboard/transfer/index", parentId: "routes/dashboard", path: "transfer", index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/transfer/index-KW4EB4VZ.js", imports: ["/build/_shared/chunk-4DWC5HXV.js", "/build/_shared/chunk-WJQUQ2OE.js", "/build/_shared/chunk-BDH4CQ6Z.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/transfer/send": { id: "routes/dashboard/transfer/send", parentId: "routes/dashboard", path: "transfer/send", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/transfer/send-FJZBBAMA.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-M6B5Z7A4.js", imports: ["/build/_shared/chunk-BDH4CQ6Z.js", "/build/_shared/chunk-LM7JCF3Z.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/sign-out": { id: "routes/sign-out", parentId: "root", path: "sign-out", index: void 0, caseSensitive: void 0, module: "/build/routes/sign-out-VH7Q6NKQ.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-C2B18749.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/api/addTransaction": {
    id: "routes/api/addTransaction",
    parentId: "root",
    path: "api/addTransaction",
    index: void 0,
    caseSensitive: void 0,
    module: addTransaction_exports
  },
  "routes/api/user/$userId": {
    id: "routes/api/user/$userId",
    parentId: "root",
    path: "api/user/:userId",
    index: void 0,
    caseSensitive: void 0,
    module: userId_exports
  },
  "routes/api/addWallet": {
    id: "routes/api/addWallet",
    parentId: "root",
    path: "api/addWallet",
    index: void 0,
    caseSensitive: void 0,
    module: addWallet_exports
  },
  "routes/api/login": {
    id: "routes/api/login",
    parentId: "root",
    path: "api/login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports
  },
  "routes/dashboard/transfer/index": {
    id: "routes/dashboard/transfer/index",
    parentId: "routes/dashboard",
    path: "transfer",
    index: !0,
    caseSensitive: void 0,
    module: transfer_exports
  },
  "routes/dashboard/transfer/send": {
    id: "routes/dashboard/transfer/send",
    parentId: "routes/dashboard",
    path: "transfer/send",
    index: void 0,
    caseSensitive: void 0,
    module: send_exports
  },
  "routes/dashboard/my-wallets": {
    id: "routes/dashboard/my-wallets",
    parentId: "routes/dashboard",
    path: "my-wallets",
    index: void 0,
    caseSensitive: void 0,
    module: my_wallets_exports
  },
  "routes/dashboard/index": {
    id: "routes/dashboard/index",
    parentId: "routes/dashboard",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: dashboard_exports2
  },
  "routes/sign-out": {
    id: "routes/sign-out",
    parentId: "root",
    path: "sign-out",
    index: void 0,
    caseSensitive: void 0,
    module: sign_out_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
