export function getValeurApresAmortissement(possession) {
    const dateActuelle = new Date();
    const possessionOwningDate = new Date(possession.owningdate);
    if (dateActuelle < possessionOwningDate) {
      return 0;
    }
    const differenceDate = {
      year: dateActuelle.getFullYear() - possessionOwningDate.getFullYear(),
      month: dateActuelle.getMonth() - possessionOwningDate.getMonth(),
      day: dateActuelle.getDate() - possessionOwningDate.getDate(),
    };

    var raison =
      differenceDate.year +
      differenceDate.month / 12 +
      differenceDate.day / 365;

    const result =
      possession.value -
      possession.value * ((raison * possession.decreasingrate) / 100);
    return result;
  }
 export function getValueAtThisMoment(possession, date) {
    // const dateActuelle = new Date();
    const possessionOwningDate = new Date(possession.owningdate);
    if (date < possessionOwningDate) {
      return 0;
    }
    const differenceDate = {
      year: date.getFullYear() - possessionOwningDate.getFullYear(),
      month: date.getMonth() - possessionOwningDate.getMonth(),
      day: date.getDate() - possessionOwningDate.getDate(),
    };

    var raison =
      differenceDate.year +
      differenceDate.month / 12 +
      differenceDate.day / 365;

    const result =
      possession.value -
      possession.value * ((raison * possession.decreasingrate) / 100);
    return result;
  }
