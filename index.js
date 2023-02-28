function fingerBaseDamage() {
    let fingerDamage = 475;
    let fingerLevel = document.getElementById("fingerInput").value;

    fingerDamage += (125 * fingerLevel);
    
    let agha = document.getElementById("Agha");
    if(agha.checked) {
        return fingerDamage + 100;
    } else {
        return fingerDamage;
    };
};

function fingerStackDamage() {
    let stackCount = document.getElementById("stackInput").value;
    let stackTalent = document.getElementById("Talent");
    let stackBonus = 0;

    if(stackTalent.checked) {
        stackBonus +=(60*stackCount);
    } else {
        stackBonus+=(40*stackCount);
    };

    return stackBonus;
};

function fingerFinalDamage() {
    return (fingerBaseDamage() + fingerStackDamage());
}

function dagonDamage() {
    let dagonDamage = 300;
    let dagonLevel = document.getElementById("dagonInput").value;

    if(dagonLevel==0) {
        dagonDamage=0;
    } else {
        dagonDamage += dagonLevel * 100;
    };
    return dagonDamage;
};

function spikeDamage() {
    let spikeLevel = document.getElementById("spikeInput").value;
    let spikeTalent = document.getElementById("spikeTalent");
    let spikeDmg = 40;
    
    if(spikeLevel==0) {
        return 0;
    } else {
        spikeDmg+=(55*spikeLevel);
    }

    if (spikeTalent.checked) {
        return (spikeDmg + 65);
    } else {
        return spikeDmg;
    }
};

function damageSourceSum(dmg_src_arr) {
    let dmgSources = dmg_src_arr;
    let dmgSum = 0;
    for(let i=0; i < dmgSources.length; i++) {
        dmgSum += dmgSources[i];
    };

    return dmgSum;
};

function outboundAmpMult() {
    let outboundAmpMult = 100;
    let outAmpList = document.getElementsByClassName("outboundAmpSource");

    for (let i=0; i < outAmpList.length; i++) {
        if(outAmpList[i].checked) {
            outboundAmpMult += parseInt(outAmpList[i].value);
        };
    };

    return outboundAmpMult / 100;
};

function inboundAmpMult() {
    let inboundAmpMult = 100;
    let inAmpList = document.getElementsByClassName("inboundAmpSource");

    for (let i=0; i < inAmpList.length; i++) {
        if(inAmpList[i].checked) {
            inboundAmpMult += parseInt(inAmpList[i].value);
        };
    };

    return inboundAmpMult / 100;
}
function ampMult() {
    let ampMult = outboundAmpMult() * inboundAmpMult();
    return ampMult;
};

function magicResCalc() {
    let initRes = document.getElementById("magicRes").value;
    let finalRes=100-((100-initRes) * magicResModifierCalc());
    return finalRes / 100;
};

function magicResModifierCalc() {
    let magicResModifierList = document.getElementsByClassName("magicResModifier");
    let magicResFinalModifier = 1
    for(let i=0; i < magicResModifierList.length; i++) {
        if(magicResModifierList[i].checked) {
            hasChecked = true;
            magicResFinalModifier *= (1-magicResModifierList[i].value/100.0);
        };
    };

    return magicResFinalModifier;
}

function damageCalc(dmg_src_arr, debuff) {
    let baseRes = (document.getElementById("magicRes").value / 100);
    let burst = damageSourceSum(dmg_src_arr) * ampMult()
    console.log(burst);
    if(debuff==true) {
        res=(1-magicResCalc());
    } else {
        res=(1-baseRes);
    };
    return (burst*res).toFixed(2);
};


function displayOutput() {
    let fingerOnly=[fingerFinalDamage()];
    let fullBurst=[fingerFinalDamage(),dagonDamage(),spikeDamage()];

    let fingerOnlyDmg = damageCalc(fingerOnly, false);
    let fingerEthDmg = damageCalc(fingerOnly, true);
    let fullBurstDmg = damageCalc(fullBurst, true);

    document.getElementById("rawFingerOnly").innerHTML = fingerOnlyDmg;
    document.getElementById("rawFingerEther").innerHTML = fingerEthDmg;
    document.getElementById("rawBurst").innerHTML = fullBurstDmg;
    document.getElementById("pipFingerOnly").innerHTML= Math.floor(fingerOnlyDmg / 250);
    document.getElementById("pipFingerEther").innerHTML= Math.floor(fingerEthDmg / 250);
    document.getElementById("pipBurst").innerHTML= Math.floor(fullBurstDmg / 250);
};
