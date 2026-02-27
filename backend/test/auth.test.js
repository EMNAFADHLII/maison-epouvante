const bcrypt = require("bcrypt");

describe("Test logique métier - Hashage du mot de passe", () => {

 test("Le mot de passe doit être hashé correctement", async () => {

 const password = "test1234";

 const hash = await bcrypt.hash(password, 10);

 expect(hash).not.toBe(password);

 });

});