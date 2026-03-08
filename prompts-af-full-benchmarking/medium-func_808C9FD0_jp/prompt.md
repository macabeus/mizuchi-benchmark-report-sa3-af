You are decompiling an assembly function called `func_808C9FD0_jp` in MIPS from a Nintendo 64 game.











# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/player_actor/m_player/func_808C9FD0_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_808C9FD0_jp
nonmatching func_808C9FD0_jp, 0x90
    /* 7C36A0 808C9FD0 27BDFFD8 */  addiu       $sp, $sp, -0x28
    /* 7C36A4 808C9FD4 AFB00018 */  sw          $s0, 0x18($sp)
    /* 7C36A8 808C9FD8 00808025 */  or          $s0, $a0, $zero
    /* 7C36AC 808C9FDC AFBF001C */  sw          $ra, 0x1C($sp)
    /* 7C36B0 808C9FE0 AFA5002C */  sw          $a1, 0x2C($sp)
    /* 7C36B4 808C9FE4 02002025 */  or          $a0, $s0, $zero
    /* 7C36B8 808C9FE8 0C232798 */  jal         func_808C9E60_jp
    /* 7C36BC 808C9FEC 27A50024 */   addiu      $a1, $sp, 0x24
    /* 7C36C0 808C9FF0 AFA20020 */  sw          $v0, 0x20($sp)
    /* 7C36C4 808C9FF4 02002025 */  or          $a0, $s0, $zero
    /* 7C36C8 808C9FF8 0C2327B8 */  jal         func_808C9EE0_jp
    /* 7C36CC 808C9FFC 8FA50024 */   lw         $a1, 0x24($sp)
    /* 7C36D0 808CA000 0C2327C9 */  jal         func_808C9F24_jp
    /* 7C36D4 808CA004 02002025 */   or         $a0, $s0, $zero
    /* 7C36D8 808CA008 02002025 */  or          $a0, $s0, $zero
    /* 7C36DC 808CA00C 0C22D879 */  jal         func_808B61E4_jp
    /* 7C36E0 808CA010 8FA5002C */   lw         $a1, 0x2C($sp)
    /* 7C36E4 808CA014 0C22D4C4 */  jal         func_808B5310_jp
    /* 7C36E8 808CA018 02002025 */   or         $a0, $s0, $zero
    /* 7C36EC 808CA01C 0C22CDBD */  jal         func_808B36F4_jp
    /* 7C36F0 808CA020 02002025 */   or         $a0, $s0, $zero
    /* 7C36F4 808CA024 02002025 */  or          $a0, $s0, $zero
    /* 7C36F8 808CA028 0C2327DC */  jal         func_808C9F70_jp
    /* 7C36FC 808CA02C 8FA5002C */   lw         $a1, 0x2C($sp)
    /* 7C3700 808CA030 02002025 */  or          $a0, $s0, $zero
    /* 7C3704 808CA034 0C22FD04 */  jal         func_808BF410_jp
    /* 7C3708 808CA038 8FA5002C */   lw         $a1, 0x2C($sp)
    /* 7C370C 808CA03C 02002025 */  or          $a0, $s0, $zero
    /* 7C3710 808CA040 8FA5002C */  lw          $a1, 0x2C($sp)
    /* 7C3714 808CA044 0C2327E4 */  jal         func_808C9F90_jp
    /* 7C3718 808CA048 8FA60020 */   lw         $a2, 0x20($sp)
    /* 7C371C 808CA04C 8FBF001C */  lw          $ra, 0x1C($sp)
    /* 7C3720 808CA050 8FB00018 */  lw          $s0, 0x18($sp)
    /* 7C3724 808CA054 27BD0028 */  addiu       $sp, $sp, 0x28
    /* 7C3728 808CA058 03E00008 */  jr          $ra
    /* 7C372C 808CA05C 00000000 */   nop
endlabel func_808C9FD0_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
