const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Cocktail = require('../models/cocktail');
const User = require('../models/user');

Cocktail.collection.drop();
User.collection.drop();

User
  .create([{
    username: 'markjdvs',
    email: 'markjdvs@gmail.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created.`);
    return Cocktail
      .create([{
        name: 'Old Fashioned',
        sweet: 1,
        tart: 0,
        bitter: 1,
        recipe: 'Place sugar in an Old Fashioned glass. Douse with bitters and add a few drops of water. Add whiskey and stir until sugar is dissolved. Add several large ice cubes and stir rapidly with a bar spoon to chill. Garnish, if you like, with a slice of orange and/or a cherry.',
        image: 'of.jpg',
        mainSpirit: {
          name: 'Makers Mark Bourbon 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/978/0085246342978/IDShot_90x90.jpg',
          price: 29.00,
          tpnb: 66506119
        }
      }, {
        name: 'Margarita',
        sweet: 0,
        tart: 1,
        bitter: 1,
        recipe: 'Run lime wedge around the outer rims of two rocks glasses and dip rims in salt. Set aside. In cocktail shaker, combine tequila, Cointreau, and lime juice. Fill with ice and shake until thoroughly chilled, about 15 seconds (the bottom of a metal shaker should frost over). Fill glasses with fresh ice and strain margarita into both glasses. Garnish with lime wheels and serve.',
        image: 'margarita.jpg',
        mainSpirit: {
          name: 'Jose Cuervo Gold Tequila 50Cl',
          image: 'http://img.tesco.com/Groceries/pi/124/7501035042124/IDShot_90x90.jpg',
          price: 15.00,
          tpnb: 56118980
        }
      }, {
        name: 'Bloody Mary',
        sweet: 0,
        tart: 1,
        bitter: 0,
        recipe: 'Place celery salt in a shallow saucer. Rub rim of 12-ounce tumbler with 1 lemon wedge and coat wet edge with celery salt. Place lemon wedge on rim of glass. Fill glass with ice. Add Worcestershire, soy, black pepper, cayenne pepper, hot sauce, and horseradish to bottom of cocktail shaker. Fill shaker with ice and add vodka, tomato juice, and juice of remaining lemon wedge. Shake vigorously, taste for seasoning and heat, and adjust as necessary. Strain into ice-filled glass. Garnish with celery stalk and serve immediately.',
        image: 'bloodymary.jpg',
        mainSpirit: {
          name: 'Tesco Imperial Vodka 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/664/5018374066664/IDShot_90x90.jpg',
          price: 10.50,
          tpnb: 50237911
        }
      }, {
        name: 'Daiquiri',
        sweet: 1,
        tart: 1,
        bitter: 1,
        recipe: 'Pour sugar and lime juice into a cocktail shaker and stir until sugar is dissolved. Add the rum and fill shaker with ice; shake well for 10 seconds and strain into a chilled cocktail glass. Garnish with a wedge of lime.',
        image: 'daiquiri.jpg',
        mainSpirit: {
          name: 'Havana Club 3 Year Old 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/231/8501110080231/IDShot_90x90.jpg',
          price: 18.00,
          tpnb: 61447830
        }
      }, {
        name: 'Martini',
        sweet: 0,
        tart: 1,
        bitter: 1,
        recipe: 'Combine ingredients in a mixing glass and fill with ice. Stir well to chill and strain into a chilled cocktail glass. Twist a piece of lemon peel over the drink and use as garnish, or, if you must, toss in an olive.',
        image: 'martini.jpg',
        mainSpirit: {
          name: 'Whitley Neill Gin 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/753/5011166052753/IDShot_90x90.jpg',
          price: 26,
          tpnb: 81234907
        }
      }, {
        name: 'Martinez',
        sweet: 1,
        tart: 0,
        bitter: 1,
        recipe: 'Fill a mixing glass with ice. Add gin, sweet vermouth, maraschino liqueur, and orange bitters. Stir until very cold then strain into a chilled cocktail glass. Twist lemon peel over cocktail to express its oils. Rub rim of glass with peel and discard.',
        image: 'martinez.jpg',
        mainSpirit: {
          name: 'Martin Miller Gin 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/388/0698929000388/IDShot_90x90.jpg',
          price: 26.00,
          tpnb: 81782246
        }
      }, {
        name: 'Sidecar',
        sweet: 1,
        tart: 1,
        bitter: 0,
        recipe: 'Combine brandy, Cointreau, and lemon juice in a cocktail shaker and fill with ice. Shake well until chilled, about 10 seconds. Strain into prepared glass; garnish with a twist of orange or lemon peel, if the urge comes across.',
        image: 'sidecar.jpg',
        mainSpirit: {
          name: 'Courvoisier V.S. Cognac 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/076/3049197110076/IDShot_90x90.jpg',
          price: 22.00,
          tpnb: 50238708
        }
      }, {
        name: 'Negroni',
        sweet: 0,
        tart: 0,
        bitter: 1,
        recipe: 'Combine the ingredients in an old-fashioned glass filled with ice; stir to combine, twist a thin piece of orange peel over the drink for aromatics and use the twist as garnish.',
        image: 'negroni.jpg',
        mainSpirit: {
          name: 'Bombay Sapphire Gin 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/006/5010677714006/IDShot_90x90.jpg',
          price: 21.0,
          tpnb: 51924148
        }
      }, {
        name: 'Caipirinha',
        sweet: 1,
        tart: 1,
        bitter: 0,
        recipe: 'Place the lime pieces and sugar in the cocktail shaker and crush with the muddler. Add cachaça and a handful of ice; shake well and pour, unstrained, into a rocks or old fashioned glass.',
        image: 'caipirinha.jpg',
        mainSpirit: {
          name: 'Wray And Nephew Overproof Rum 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/008/5024576010008/IDShot_90x90.jpg',
          price: 25.5,
          tpnb: 51701850
        }
      }, {
        name: 'Mojito',
        sweet: 1,
        tart: 1,
        bitter: 0,
        recipe: 'Place sugar and mint leaves in a serving glass, and gently muddle just until the leaves release their oils. Fill glass with ice. Add rum and lime juice. Stir to combine. Top with club soda and add mint sprigs and lime twist for garnish.',
        image: 'mojito.jpg',
        mainSpirit: {
          name: 'Havana Club 3 Year Old 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/231/8501110080231/IDShot_90x90.jpg',
          price: 18.00,
          tpnb: 61447830
        }
      }, {
        name: 'Sazerac',
        sweet: 0,
        tart: 0,
        bitter: 1,
        recipe: 'Chill an Old Fashioned glass or small tumbler in your freezer. In a mixing glass, combine sugar, Peychaud’s Bitters, and a few drops of water. Mix until sugar is dissolved, and add rye. Add plenty of ice, and stir for about 30 seconds. Pour Herbsaint, pastis, or absinthe into your chilled glass, and rotate glass until the inside is well coated; discard the excess. Strain the liquid from your mixing glass into the serving glass. Twist a piece of lemon peel over the drink. Indulge.',
        image: 'sazerac.jpg',
        mainSpirit: {
          name: 'Bulleit Rye Whiskey 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/585/0082000765585/IDShot_90x90.jpg',
          price: 25.00,
          tpnb: 81720292
        }
      }, {
        name: 'Mai Tai',
        sweet: 1,
        tart: 0,
        bitter: 0,
        recipe: 'Pour all ingredients into a cocktail shaker and fill with ice. Shake well for 10 seconds and strain into a double old-fashioned glass filled with crushed ice. Garnish with lime shell and a sprig of fresh mint.',
        image: 'maitai.jpg',
        mainSpirit: {
          name: 'Appleton Estate Jamaica Rum 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/100/5024576189100/IDShot_90x90.jpg',
          price: 21.00,
          tpnb: 51915257
        }
      }, {
        name: 'Tom Collins',
        sweet: 0,
        tart: 1,
        bitter: 1,
        recipe: 'Add gin, lemon and sugar to a Collins glass and stir to dissolve sugar (you can instead use simple syrup and make the process easier). Fill glass with large chunks of ice and top with chilled club soda. Insert straw and do what comes natural.',
        image: 'tomcollins.jpg',
        mainSpirit: {
          name: 'Bombay Sapphire Gin 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/006/5010677714006/IDShot_90x90.jpg',
          price: 21.00,
          tpnb: 51924148
        }
      }, {
        name: 'Mint Julep',
        sweet: 1,
        tart: 0,
        bitter: 1,
        recipe: `Place the sugar and water at the bottom of a julep cup or tall glass and stir until sugar is dissolved (or speed the process by using simple syrup). Add the mint leaves and gently bruise with a wooden muddler or a wooden spoon. Take care not to overwork the mint, but swab the sides of the glass with the mint's aromatic oils. Half-fill the glass with crushed ice and add the bourbon, stirring to combine. Fill the glass with crushed ice and stir until the outside of the glass frosts. Add more crushed ice if needed to fill, and generously adorn the drink with sprigs of fresh mint. Serve with a short straw, so the fragrance of the mint bouquet will greet the drinker with each sip.`,
        image: 'mintjulep.jpg',
        mainSpirit: {
          name: 'Buffalo Trace Bourbon Whiskey 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/984/0080244009984/IDShot_90x90.jpg',
          price: 23.00,
          tpnb: 74716158
        }
      }, {
        name: 'French 75',
        sweet: 1,
        tart: 1,
        bitter: 0,
        recipe: `Fill cocktail shaker with ice. Shake gin, lemon juice, and sugar in a cocktail shaker until well chilled, about 15 seconds. Strain into a champagne flute. Top with Champagne. Stir gently, garnish with a long, thin lemon spiral and a cocktail cherry.`,
        image: 'french75.jpg',
        mainSpirit: {
          name: 'Bloom London Dry Gin 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/249/5010296169249/IDShot_90x90.jpg',
          price: 24.00,
          tpnb: 72618646
        }
      }, {
        name: 'Whiskey Sour',
        sweet: 1,
        tart: 1,
        bitter: 0,
        recipe: `Pour ingredients into a cocktail shaker, fill with ice and shake for 10 seconds (if using the egg white, give it a little extra muscle and a little extra time). Strain into a chilled cocktail glass, or into an ice-filled Old Fashioned glass. Garnish with a cherry, a slice of orange, or everything or nothing at all.`,
        image: 'whiskeysour.jpg',
        mainSpirit: {
          name: 'Wild Turkey Bourbon Whiskey 70Cl',
          image: 'http://img.tesco.com/Groceries/pi/012/8000040500012/IDShot_90x90.jpg',
          price: 23.00,
          tpnb: 74102049
        }
      }]);
  })
  .then((cocktails) => console.log(`${cocktails.length} cocktails created.`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
