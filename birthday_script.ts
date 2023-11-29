// Kalendarzyk 2024 / Birthday
// -> birthday_script.ts

const textarea = document.getElementById("data_textarea")! as HTMLTextAreaElement;


function main(): void
{
    const ol = document.getElementById("data_ol");
    const ol2 = document.getElementById("data_ol2");
    let value: string = "";

    let d = new Date(2024, 0, 1, 12);

    for (let i = 0; i < 366; i++)
    {
        const li = document.createElement("li");
        const li2 = document.createElement("li");
        li.textContent = d.toLocaleDateString();
        li2.textContent = "\u00a0";

        if (d.getDate() == 1)
        {
            li.classList.add("highlight");
            li2.classList.add("highlight");
        }

        ol?.appendChild(li);
        ol2?.appendChild(li2);

        d = new Date(d.getTime() + (24 * 60 * 60 * 1000));
        if (i > 0) value += "\n";
    }

    textarea.textContent = value;

    document.getElementById("check")?.addEventListener("click", check);
    document.getElementById("save")?.addEventListener("click", save);
}


function getList(): Array<string>
{
    const list: Array<string> = textarea.value!.split(/\n/gm)!.slice(0, 366);
    return list;
}

function check(): void
{
    const list: Array<string> = getList();
    let d = new Date(2024, 0, 1, 12);


    let code: string = "";
    code = "<table>";

    for (let i = 0; i < 366; i++)
    {
        const highlight = (d.getDate() == 1) ? "highlight" : "";

        code += `<tr class='${highlight}'>
        <td>${i + 1}</td>
        <td>${d.toLocaleDateString()}</td>
        <td>${formatText(list[i]) || ""}</td>
        </tr>`;

        if (i == 181)
        {
            code += "</table><table>";
        }

        d = new Date(d.getTime() + (24 * 60 * 60 * 1000));

    }

    code += "</table>";
    document.getElementById("result_container")!.innerHTML = code;
}

function save(): void
{
    const list: Array<string> = getList();
    for (let i = 0; i < list.length; i++)
    {
        list[i] = formatText(list[i]);
    }
    const birthdayList = JSON.stringify(list);

    const login = (document.getElementById("login") as HTMLInputElement).value;
    const accessKey = (document.getElementById("accessKey") as HTMLInputElement).value;

    const request = { login, accessKey, birthdayList } as { login: string, accessKey: string, birthdayList?: string };

    fetch("https://europe-west3-kalendarzyk2024.cloudfunctions.net/saveBirthdayToCalendar", {
        method: "POST",
        body: JSON.stringify(request)
    }).then((async response =>
    {
        if (response.ok)
        {
            setResultMessage("Zapisano pomyślnie :)");
        }
        else
        {
            setResultMessage("Niepoprawny login lub kod dostępu.");
            throw new Error(response.status + " / " + response.statusText);
        }
    }));
}

function setResultMessage(message: string): void
{
    const el = document.getElementById("result_message");
    el.textContent = message;
}

function formatText(text_in: string): string
{
    if (!text_in) { return ""; }

    let t = text_in;

    t = t.replace(/\&lt\;/gm, "<");
    t = t.replace(/\&gt\;/gm, ">");

    t = t.replace(/\&/gm, "&amp;");
    t = t.replace(/</gm, "&lt;");
    t = t.replace(/>/gm, "&gt;");


    t = t.replace(/\\;/gm, ";");

    return t;
}








main();