You are decompiling an assembly function called `func_808D9348_jp` in MIPS from a Nintendo 64 game.











# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/player_actor/m_player/func_808D9348_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_808D9348_jp
nonmatching func_808D9348_jp, 0xA8
    /* 7D2A18 808D9348 27BDFFD8 */  addiu       $sp, $sp, -0x28
    /* 7D2A1C 808D934C AFB10018 */  sw          $s1, 0x18($sp)
    /* 7D2A20 808D9350 AFB00014 */  sw          $s0, 0x14($sp)
    /* 7D2A24 808D9354 00808025 */  or          $s0, $a0, $zero
    /* 7D2A28 808D9358 00A08825 */  or          $s1, $a1, $zero
    /* 7D2A2C 808D935C AFBF001C */  sw          $ra, 0x1C($sp)
    /* 7D2A30 808D9360 0C23630B */  jal         func_808D8C2C_jp
    /* 7D2A34 808D9364 02002025 */   or         $a0, $s0, $zero
    /* 7D2A38 808D9368 02002025 */  or          $a0, $s0, $zero
    /* 7D2A3C 808D936C 0C22D879 */  jal         func_808B61E4_jp
    /* 7D2A40 808D9370 02202825 */   or         $a1, $s1, $zero
    /* 7D2A44 808D9374 02002025 */  or          $a0, $s0, $zero
    /* 7D2A48 808D9378 0C236316 */  jal         func_808D8C58_jp
    /* 7D2A4C 808D937C 27A50024 */   addiu      $a1, $sp, 0x24
    /* 7D2A50 808D9380 AFA20020 */  sw          $v0, 0x20($sp)
    /* 7D2A54 808D9384 02002025 */  or          $a0, $s0, $zero
    /* 7D2A58 808D9388 02202825 */  or          $a1, $s1, $zero
    /* 7D2A5C 808D938C 0C23643F */  jal         func_808D90FC_jp
    /* 7D2A60 808D9390 8FA60024 */   lw         $a2, 0x24($sp)
    /* 7D2A64 808D9394 0C236451 */  jal         func_808D9144_jp
    /* 7D2A68 808D9398 02002025 */   or         $a0, $s0, $zero
    /* 7D2A6C 808D939C 0C22D4C4 */  jal         func_808B5310_jp
    /* 7D2A70 808D93A0 02002025 */   or         $a0, $s0, $zero
    /* 7D2A74 808D93A4 0C22CE0A */  jal         func_808B3828_jp
    /* 7D2A78 808D93A8 02002025 */   or         $a0, $s0, $zero
    /* 7D2A7C 808D93AC 02002025 */  or          $a0, $s0, $zero
    /* 7D2A80 808D93B0 0C23646E */  jal         func_808D91B8_jp
    /* 7D2A84 808D93B4 02202825 */   or         $a1, $s1, $zero
    /* 7D2A88 808D93B8 0C236476 */  jal         func_808D91D8_jp
    /* 7D2A8C 808D93BC 02002025 */   or         $a0, $s0, $zero
    /* 7D2A90 808D93C0 02002025 */  or          $a0, $s0, $zero
    /* 7D2A94 808D93C4 0C22FD04 */  jal         func_808BF410_jp
    /* 7D2A98 808D93C8 02202825 */   or         $a1, $s1, $zero
    /* 7D2A9C 808D93CC 02002025 */  or          $a0, $s0, $zero
    /* 7D2AA0 808D93D0 02202825 */  or          $a1, $s1, $zero
    /* 7D2AA4 808D93D4 0C23647E */  jal         func_808D91F8_jp
    /* 7D2AA8 808D93D8 8FA60020 */   lw         $a2, 0x20($sp)
    /* 7D2AAC 808D93DC 8FBF001C */  lw          $ra, 0x1C($sp)
    /* 7D2AB0 808D93E0 8FB00014 */  lw          $s0, 0x14($sp)
    /* 7D2AB4 808D93E4 8FB10018 */  lw          $s1, 0x18($sp)
    /* 7D2AB8 808D93E8 03E00008 */  jr          $ra
    /* 7D2ABC 808D93EC 27BD0028 */   addiu      $sp, $sp, 0x28
endlabel func_808D9348_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
