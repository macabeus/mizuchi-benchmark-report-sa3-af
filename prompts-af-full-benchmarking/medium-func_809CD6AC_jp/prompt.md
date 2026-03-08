You are decompiling an assembly function called `func_809CD6AC_jp` in MIPS from a Nintendo 64 game.











# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/ovl_Npc_Shop_Master/ac_npc_shop_master/func_809CD6AC_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_809CD6AC_jp
nonmatching func_809CD6AC_jp, 0x6C
    /* 8B0E9C 809CD6AC 27BDFFE8 */  addiu       $sp, $sp, -0x18
    /* 8B0EA0 809CD6B0 AFBF0014 */  sw          $ra, 0x14($sp)
    /* 8B0EA4 809CD6B4 AFA5001C */  sw          $a1, 0x1C($sp)
    /* 8B0EA8 809CD6B8 8FA5001C */  lw          $a1, 0x1C($sp)
    /* 8B0EAC 809CD6BC 0C272EB5 */  jal         func_809CBAD4_jp
    /* 8B0EB0 809CD6C0 AFA40018 */   sw         $a0, 0x18($sp)
    /* 8B0EB4 809CD6C4 24010001 */  addiu       $at, $zero, 0x1
    /* 8B0EB8 809CD6C8 1041000F */  beq         $v0, $at, .L809CD708
    /* 8B0EBC 809CD6CC 8FA40018 */   lw         $a0, 0x18($sp)
    /* 8B0EC0 809CD6D0 8FA5001C */  lw          $a1, 0x1C($sp)
    /* 8B0EC4 809CD6D4 0C272C46 */  jal         func_809CB118_jp
    /* 8B0EC8 809CD6D8 AFA40018 */   sw         $a0, 0x18($sp)
    /* 8B0ECC 809CD6DC 8FA40018 */  lw          $a0, 0x18($sp)
    /* 8B0ED0 809CD6E0 00403025 */  or          $a2, $v0, $zero
    /* 8B0ED4 809CD6E4 8C8E0938 */  lw          $t6, 0x938($a0)
    /* 8B0ED8 809CD6E8 104E0005 */  beq         $v0, $t6, .L809CD700
    /* 8B0EDC 809CD6EC 00000000 */   nop
    /* 8B0EE0 809CD6F0 0C2737FD */  jal         func_809CDFF4_jp
    /* 8B0EE4 809CD6F4 8FA5001C */   lw         $a1, 0x1C($sp)
    /* 8B0EE8 809CD6F8 10000004 */  b           .L809CD70C
    /* 8B0EEC 809CD6FC 8FBF0014 */   lw         $ra, 0x14($sp)
  .L809CD700:
    /* 8B0EF0 809CD700 0C272A6C */  jal         func_809CA9B0_jp
    /* 8B0EF4 809CD704 8FA5001C */   lw         $a1, 0x1C($sp)
  .L809CD708:
    /* 8B0EF8 809CD708 8FBF0014 */  lw          $ra, 0x14($sp)
  .L809CD70C:
    /* 8B0EFC 809CD70C 27BD0018 */  addiu       $sp, $sp, 0x18
    /* 8B0F00 809CD710 03E00008 */  jr          $ra
    /* 8B0F04 809CD714 00000000 */   nop
endlabel func_809CD6AC_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
