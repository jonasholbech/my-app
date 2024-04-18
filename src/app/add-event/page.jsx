import { redirect } from "next/navigation";
export default async function AddEvent() {
  async function save(formData) {
    "use server";
    let headersList = {
      Accept: "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Prefer: "return=representation",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      name: formData.get("name"),
      when: formData.get("when"),
      description: formData.get("description"),
    });

    let response = await fetch(
      "https://uwrwptibotlxlvcdeicv.supabase.co/rest/v1/erus",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    console.log(data);
    redirect("/events/" + data[0].id);
  }
  return (
    <form action={save}>
      <div className="formcontrol">
        <label htmlFor="">Navn</label>
        <input type="text" name="name" className="border-2" />
      </div>
      <div className="formcontrol">
        <label htmlFor="">Hvornår</label>
        <input type="date" name="when" className="border-2" />
      </div>
      <div className="formcontrol">
        <label htmlFor="">Beskrivelse</label>
        <input type="text" name="description" className="border-2" />
      </div>
      <button>Gem</button>
    </form>
  );
}
