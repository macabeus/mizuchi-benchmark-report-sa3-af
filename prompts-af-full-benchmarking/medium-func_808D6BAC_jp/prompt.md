You are decompiling an assembly function called `func_808D6BAC_jp` in MIPS from a Nintendo 64 game.











# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/player_actor/m_player/func_808D6BAC_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_808D6BAC_jp
nonmatching func_808D6BAC_jp, 0x88
    /* 7D027C 808D6BAC 27BDFFC8 */  addiu       $sp, $sp, -0x38
    /* 7D0280 808D6BB0 AFBF002C */  sw          $ra, 0x2C($sp)
    /* 7D0284 808D6BB4 AFA40038 */  sw          $a0, 0x38($sp)
    /* 7D0288 808D6BB8 AFA5003C */  sw          $a1, 0x3C($sp)
    /* 7D028C 808D6BBC 27AE0030 */  addiu       $t6, $sp, 0x30
    /* 7D0290 808D6BC0 AFAE0010 */  sw          $t6, 0x10($sp)
    /* 7D0294 808D6BC4 8FA40038 */  lw          $a0, 0x38($sp)
    /* 7D0298 808D6BC8 00002825 */  or          $a1, $zero, $zero
    /* 7D029C 808D6BCC 3C06C0A0 */  lui         $a2, (0xC0A00000 >> 16)
    /* 7D02A0 808D6BD0 0C22E11B */  jal         func_808B846C_jp
    /* 7D02A4 808D6BD4 27A70034 */   addiu      $a3, $sp, 0x34
    /* 7D02A8 808D6BD8 3C013F80 */  lui         $at, (0x3F800000 >> 16)
    /* 7D02AC 808D6BDC 44810000 */  mtc1        $at, $fv0
    /* 7D02B0 808D6BE0 44812000 */  mtc1        $at, $ft0
    /* 7D02B4 808D6BE4 3C01C0A0 */  lui         $at, (0xC0A00000 >> 16)
    /* 7D02B8 808D6BE8 44813000 */  mtc1        $at, $ft1
    /* 7D02BC 808D6BEC 8FAF0030 */  lw          $t7, 0x30($sp)
    /* 7D02C0 808D6BF0 8FA40038 */  lw          $a0, 0x38($sp)
    /* 7D02C4 808D6BF4 8FA5003C */  lw          $a1, 0x3C($sp)
    /* 7D02C8 808D6BF8 00003025 */  or          $a2, $zero, $zero
    /* 7D02CC 808D6BFC 8FA70034 */  lw          $a3, 0x34($sp)
    /* 7D02D0 808D6C00 E7A00010 */  swc1        $fv0, 0x10($sp)
    /* 7D02D4 808D6C04 E7A00014 */  swc1        $fv0, 0x14($sp)
    /* 7D02D8 808D6C08 E7A40018 */  swc1        $ft0, 0x18($sp)
    /* 7D02DC 808D6C0C AFAF0020 */  sw          $t7, 0x20($sp)
    /* 7D02E0 808D6C10 0C22D249 */  jal         func_808B4924_jp
    /* 7D02E4 808D6C14 E7A6001C */   swc1       $ft1, 0x1C($sp)
    /* 7D02E8 808D6C18 8FA40038 */  lw          $a0, 0x38($sp)
    /* 7D02EC 808D6C1C 0C22CEF4 */  jal         func_808B3BD0_jp
    /* 7D02F0 808D6C20 8FA5003C */   lw         $a1, 0x3C($sp)
    /* 7D02F4 808D6C24 8FBF002C */  lw          $ra, 0x2C($sp)
    /* 7D02F8 808D6C28 27BD0038 */  addiu       $sp, $sp, 0x38
    /* 7D02FC 808D6C2C 03E00008 */  jr          $ra
    /* 7D0300 808D6C30 00000000 */   nop
endlabel func_808D6BAC_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
