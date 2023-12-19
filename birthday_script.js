// Kalendarzyk 2024 / Birthday
// -> birthday_script.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var textarea = document.getElementById("data_textarea");
function main() {
    var _a, _b;
    var ol = document.getElementById("data_ol");
    var ol2 = document.getElementById("data_ol2");
    var value = "";
    var d = new Date(2024, 0, 1, 12);
    for (var i = 0; i < 366; i++) {
        var li = document.createElement("li");
        var li2 = document.createElement("li");
        li.textContent = d.toLocaleDateString();
        li2.textContent = "\u00a0";
        if (d.getDate() == 1) {
            li.classList.add("highlight");
            li2.classList.add("highlight");
        }
        ol === null || ol === void 0 ? void 0 : ol.appendChild(li);
        ol2 === null || ol2 === void 0 ? void 0 : ol2.appendChild(li2);
        d = new Date(d.getTime() + (24 * 60 * 60 * 1000));
        if (i > 0)
            value += "\n";
    }
    textarea.textContent = value;
    (_a = document.getElementById("check")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", check);
    (_b = document.getElementById("save")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", save);
}
function getList() {
    var list = textarea.value.split(/\n/gm).slice(0, 366);
    return list;
}
function check() {
    var list = getList();
    var d = new Date(2024, 0, 1, 12);
    var code = "";
    code = "<table>";
    for (var i = 0; i < 366; i++) {
        var highlight = (d.getDate() == 1) ? "highlight" : "";
        code += "<tr class='".concat(highlight, "'>\n        <td>").concat(i + 1, "</td>\n        <td>").concat(d.toLocaleDateString(), "</td>\n        <td>").concat(formatText(list[i]) || "", "</td>\n        </tr>");
        if (i == 181) {
            code += "</table><table>";
        }
        d = new Date(d.getTime() + (24 * 60 * 60 * 1000));
    }
    code += "</table>";
    document.getElementById("result_container").innerHTML = code;
}
function save() {
    var _this = this;
    var list = getList();
    for (var i = 0; i < list.length; i++) {
        list[i] = formatText(list[i]);
    }
    var birthdayList = JSON.stringify(list);
    var login = document.getElementById("login").value;
    var accessKey = document.getElementById("accessKey").value;
    var encryptionKey = document.getElementById("encryptionKey").value;
    var username = document.getElementById("username").value;
    var request = { login: login, accessKey: accessKey, encryptionKey: encryptionKey, birthdayList: birthdayList, username: username }; //as { login: string, accessKey: string, birthdayList?: string };
    fetch("https://europe-west3-kalendarzyk2024.cloudfunctions.net/saveBirthdayToCalendar", {
        method: "POST",
        body: JSON.stringify(request)
    }).then((function (response) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (response.ok) {
                setResultMessage("Zapisano pomyślnie :)");
            }
            else if (response.status == 400) {
                setResultMessage("Lista urodzin dla podanych danych logowania została już zapisana.");
            }
            else {
                setResultMessage("Niepoprawny login lub kod dostępu.");
                throw new Error(response.status + " / " + response.statusText);
            }
            return [2 /*return*/];
        });
    }); }));
}
function setResultMessage(message) {
    var el = document.getElementById("result_message");
    el.textContent = message;
}
function formatText(text_in) {
    if (!text_in) {
        return "";
    }
    var t = text_in;
    t = t.replace(/\&lt\;/gm, "<");
    t = t.replace(/\&gt\;/gm, ">");
    t = t.replace(/\&/gm, "&amp;");
    t = t.replace(/</gm, "&lt;");
    t = t.replace(/>/gm, "&gt;");
    t = t.replace(/\\;/gm, ";");
    return t;
}
main();
