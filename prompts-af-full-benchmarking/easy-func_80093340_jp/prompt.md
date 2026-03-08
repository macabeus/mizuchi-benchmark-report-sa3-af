You are decompiling an assembly function called `func_80093340_jp` in MIPS from a Nintendo 64 game.

# Examples

## `func_800D19DC_jp`

```c
void func_800D19DC_jp(void) {
    func_800F8B2C_jp();
}
```

```asm
         addiu sp, sp, -0x18
         sw ra, 0x14(sp)
         jal func_800F8B2C_jp
         nop 
         lw ra, 0x14(sp)
         addiu sp, sp, 0x18
         jr ra
         nop 
```

## `func_800D21CC_jp`

```c
s32 func_800D21CC_jp(void* arg0) {
    return func_800FC920_jp(arg0);
}
```

```asm
         addiu sp, sp, -0x18
         sw ra, 0x14(sp)
         jal func_800FC920_jp
         nop 
         lw ra, 0x14(sp)
         addiu sp, sp, 0x18
         jr ra
         nop 
```









# Primary Objective

Decompile the following target assembly function from `asm/jp/code/m_handbill.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_80093340_jp
nonmatching func_80093340_jp, 0x2C
    /* 6B6FE0 80093340 27BDFFE0 */  addiu       $sp, $sp, -0x20
    /* 6B6FE4 80093344 AFBF001C */  sw          $ra, 0x1C($sp)
    /* 6B6FE8 80093348 8FAF0030 */  lw          $t7, 0x30($sp)
    /* 6B6FEC 8009334C 240E000F */  addiu       $t6, $zero, 0xF
    /* 6B6FF0 80093350 AFAE0010 */  sw          $t6, 0x10($sp)
    /* 6B6FF4 80093354 0C024BF1 */  jal         func_80092FC4_jp
    /* 6B6FF8 80093358 AFAF0014 */   sw         $t7, 0x14($sp)
    /* 6B6FFC 8009335C 8FBF001C */  lw          $ra, 0x1C($sp)
    /* 6B7000 80093360 27BD0020 */  addiu       $sp, $sp, 0x20
    /* 6B7004 80093364 03E00008 */  jr          $ra
    /* 6B7008 80093368 00000000 */   nop
endlabel func_80093340_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
