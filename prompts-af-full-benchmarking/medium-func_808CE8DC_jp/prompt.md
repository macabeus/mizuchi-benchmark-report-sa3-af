You are decompiling an assembly function called `func_808CE8DC_jp` in MIPS from a Nintendo 64 game.











# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/player_actor/m_player/func_808CE8DC_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_808CE8DC_jp
nonmatching func_808CE8DC_jp, 0x54
    /* 7C7FAC 808CE8DC 27BDFFE8 */  addiu       $sp, $sp, -0x18
    /* 7C7FB0 808CE8E0 44866000 */  mtc1        $a2, $fa0
    /* 7C7FB4 808CE8E4 AFBF0014 */  sw          $ra, 0x14($sp)
    /* 7C7FB8 808CE8E8 AFA40018 */  sw          $a0, 0x18($sp)
    /* 7C7FBC 808CE8EC AFA5001C */  sw          $a1, 0x1C($sp)
    /* 7C7FC0 808CE8F0 44056000 */  mfc1        $a1, $fa0
    /* 7C7FC4 808CE8F4 0C22D5A6 */  jal         func_808B5698_jp
    /* 7C7FC8 808CE8F8 8FA40018 */   lw         $a0, 0x18($sp)
    /* 7C7FCC 808CE8FC 54400009 */  bnel        $v0, $zero, .L808CE924
    /* 7C7FD0 808CE900 8FBF0014 */   lw         $ra, 0x14($sp)
    /* 7C7FD4 808CE904 0C233A28 */  jal         func_808CE8A0_jp
    /* 7C7FD8 808CE908 8FA40018 */   lw         $a0, 0x18($sp)
    /* 7C7FDC 808CE90C 8FA40018 */  lw          $a0, 0x18($sp)
    /* 7C7FE0 808CE910 8FA5001C */  lw          $a1, 0x1C($sp)
    /* 7C7FE4 808CE914 00003025 */  or          $a2, $zero, $zero
    /* 7C7FE8 808CE918 0C22E565 */  jal         func_808B9594_jp
    /* 7C7FEC 808CE91C 00003825 */   or         $a3, $zero, $zero
    /* 7C7FF0 808CE920 8FBF0014 */  lw          $ra, 0x14($sp)
  .L808CE924:
    /* 7C7FF4 808CE924 27BD0018 */  addiu       $sp, $sp, 0x18
    /* 7C7FF8 808CE928 03E00008 */  jr          $ra
    /* 7C7FFC 808CE92C 00000000 */   nop
endlabel func_808CE8DC_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
