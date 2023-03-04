# Charte de codage

La charte de codage est un document qui regroupe l'ensemble des règles à suivre durant la programmation pour assurer un code cohérent et de qualité. Elle doit être respectée par tous les membres de l'équipe de développement.

## Règles générales

- Le code doit être lisible et compréhensible par tous les membres de l'équipe.
- Le code doit être documenté de manière adéquate. Les commentaires doivent être pertinents, clairs et concis.
- Les noms de variables, de fonctions et de classes doivent être explicites et évocateurs de leur utilisation.
- Le code doit être organisé de manière logique, en regroupant les fonctions et les classes qui ont une fonctionnalité similaire.

## Les messages des commits

- Les messages des commits doivent être clairs et explicites.
- Les messages des commits doivent décrire la fonctionnalité ou le correctif apporté par le commit.
- Les messages des commits doivent être rédigés en anglais.
- Les messages des commits doivent être rédigés en utilisant la convention suivante : _type: message_.
  Par exemple, pour faire un commit de finition de la fonctionnalité d'authentification :

  ```bash
  git commit -m "feat: completed authentification"
  ```

  ### Les types de commits

  | Type         | Description                                        |
  | ------------ | -------------------------------------------------- |
  | **feat**     | Ajout d'une nouvelle fonctionnalité                |
  | **fix**      | Correction d'un bug                                |
  | **docs**     | Modification de la documentation                   |
  | **style**    | Modification de la mise en forme du code           |
  | **refactor** | Modification du code sans changer son comportement |
  | **test**     | Ajout ou modification de tests                     |
  | **conf**     | Modification de la configuration du projet         |

## La création des branches

- Les branches doivent être créées à partir de la branche principale. i.e avant de créer une nouvelle branche, il faut basculer vers la branche **master**.
  Avant de commencer à travailler :

  ```bash
  git checkout master
  ```

  Effectuer un pull :

  ```bash
  git pull origin master
  ```

  En fin créer et basculer vers la nouvelle branche :

  ```bash
  git checkout -b feature-name
  ```

- Les branches doivent être nommées de manière explicite pour indiquer leur fonctionnalité ou leur objectif ainsi que le responsable de la tâche. elles doivent être nommées de cette manière : _name/feature/feature-name_.
  Par exemple, pour la création de la fonctionnalité d'authentification :

  ```bash
  git checkout -b name/feature/auth
  ```

- Les branches doivent être fusionnées dans la branche principale après la fin de leur développement et leur validation.

## Les normes de codage

- Les noms des variables doivent être en anglais, en utilisant la convention camelCase.
  ```javascript
  const myVariable = "Hello World";
  ```
- Les noms des constantes doivent être en anglais, en utilisant la convention SCREAMING_SNAKE_CASE.

  ```javascript
  const API_URL = "https://api.example.com";
  ```

- Les noms des fonctions et des classes doivent être en anglais, en utilisant la convention PascalCase.

  ```javascript
  class MyClass {
    myFunction() {
      // ...
    }
  }
  ```

- Les fonctions doivent être écrites avec des commentaires avant le début de la fonction expliquant leur but et leur utilisation.

  ```javascript
  /**
   * This function is used to do something
   * @param {string} param1 - The first parameter
   * @param {number} param2 - The second parameter
   * @returns {boolean} - The result of the function
   */
  function myFunction(param1, param2) {
    // ...
  }
  ```

## Structure de code

- Utiliser Prettier pour le formatage du code.

- Chaque projet aura son propre fichier de configuration Prettier.

## La documentation du code

- Le code doit être documenté pour faciliter la compréhension de son fonctionnement et de son utilisation.
- Les commentaires doivent être placés à des endroits stratégiques pour aider à la compréhension du code.
- Les commentaires doivent être clairs, précis et pertinents. Ils doivent décrire le fonctionnement de la fonction, de la classe ou de la variable.
- Les commentaires doivent être rédigés en anglais.
- Le code doit être documenté de manière à faciliter la maintenance et les éventuelles modifications futures.

## Conclusion

La charte de codage est essentielle pour assurer un code de qualité, cohérent et facilement lisible par tous les membres de l'équipe. Elle doit être suivie avec rigueur et respect par tous les développeurs travaillant sur le projet.
