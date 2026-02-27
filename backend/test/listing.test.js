describe("Test fonctionnel - Création d'annonce", () => {

 test("Une annonce doit contenir un titre et un prix", () => {

 const annonce = {
 title: "Maison hantée",
 price: 100
 };

 expect(annonce.title).toBeDefined();
 expect(annonce.price).toBeGreaterThan(0);

 });

});