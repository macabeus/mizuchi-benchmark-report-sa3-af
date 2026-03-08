You are decompiling an assembly function called `func_808BB604_jp` in MIPS from a Nintendo 64 game.

# Examples

## `mSM_tex_move`

```c
void mSM_tex_move(Submenu* submenu) {
    struct_8085E9B0_unk_10670* temp_v0 = &submenu->unk_2C->unk_10670;

    temp_v0->unk_28 += 0.707f;
    temp_v0->unk_2C += 0.707f;

    while (temp_v0->unk_28 >= 1024.0f) {
        temp_v0->unk_28 -= 1024.0f;
    }

    while (temp_v0->unk_2C >= 1024.0f) {
        temp_v0->unk_2C -= 1024.0f;
    }
}
```

```asm
         lui at, %hi([.rodata]+0x34)
         lwc1 fv1, %lo([.rodata]+0x34)(at)
         lui at, 0x4480
         mtc1 at, fa0
         nop 
         lw v0, 0x2c(a0)
         lui at, 0x1
         ori at, at, 0x670
         addu v0, v0, at
         lwc1 ft0, 0x28(v0)
         lwc1 ft2, 0x2c(v0)
         add.s ft1, ft0, fv1
         add.s ft3, ft2, fv1
         swc1 ft1, 0x28(v0)
         lwc1 fv0, 0x28(v0)
         swc1 ft3, 0x2c(v0)
         c.le.s fa0, fv0
         nop 
         bc1fl .L7028
         lwc1 fv0, 0x2c(v0)
         sub.s ft4, fv0, fa0
     25swc1 ft4, 0x28(v0)
         lwc1 fv0, 0x28(v0)
         c.le.s fa0, fv0
         nop 
         bc1tl .L5421
         sub.s ft4, fv0, fa0
         lwc1 fv0, 0x2c(v0)
     18c.le.s fa0, fv0
         nop 
         bc1f .L9c39
         nop 
         sub.s ft5, fv0, fa0
     37swc1 ft5, 0x2c(v0)
         lwc1 fv0, 0x2c(v0)
         c.le.s fa0, fv0
         nop 
         bc1tl .L8433
         sub.s ft5, fv0, fa0
     30jr ra
         nop 
```

## `func_800C5F0C_jp`

```c
s32 func_800C5F0C_jp(ObjectStatus* objectStatus, ObjectExchangeBank* objectExchangeBank) {
    s32 res = 1;
    u32 alignedRam = ALIGN16(objectExchangeBank->unk1800 + objectStatus->size);

    if (alignedRam >= (u32)objectExchangeBank->unk1804) {
        res = 0;

    } else {
        objectStatus->vram = (void*)objectExchangeBank->unk1800;
        objectStatus->unk52 = objectExchangeBank->unk181C;
        objectStatus->unk53 = 1;
        objectStatus->unk14.vrom = 0;
        objectExchangeBank->unk1800 = alignedRam;
    }

    return res;
}
```

```asm
         lw a2, 0x1800(a1)
         lw t6, 0x10(a0)
         lw t7, 0x1804(a1)
         addiu at, zero, -0x10
         addu v0, a2, t6
         addiu v0, v0, 0xf
         and v0, v0, at
         sltu at, v0, t7
         bnez at, .L3012
         addiu v1, zero, 0x1
         b .L4c19
         or v1, zero, zero
     8sw  a2, 0x8(a0)
         lw t8, 0x181c(a1)
         addiu t9, zero, 0x1
         sb t9, 0x53(a0)
         sw zero, 0x14(a0)
         sb t8, 0x52(a0)
         sw v0, 0x1800(a1)
     10or v0, v1, zero
         jr ra
         nop 
```

## `mSM_set_new_start_data`

```c
void mSM_set_new_start_data(Submenu* submenu) {
    SubmenuProgramId programId = submenu->programId;
    struct_8085E9B0_unk_10088* temp_v1 = &submenu->unk_2C->unk_10088[programId];
    f32* temp_a1 = data_table_935[programId];

    temp_v1->unk_00 = programId;
    temp_v1->unk_18 = temp_a1[0];
    temp_v1->unk_1C = temp_a1[1];
    temp_v1->unk_20 = temp_a1[2];
    temp_v1->unk_24 = temp_a1[3];
    temp_v1->unk_38 = submenu->unk_10;
    temp_v1->unk_3C = submenu->unk_14;
    temp_v1->unk_40 = submenu->unk_18;
    temp_v1->unk_44 = submenu->unk_1C;

    if ((programId == SUBMENU_PROGRAM_1) && (submenu->unk_10 == 0xE)) {
        temp_v1->unk_18 = -300.0f;
    }
}
```

```asm
         lw v0, 0x4(a0)
         lw t6, 0x2c(a0)
         lui at, 0x1
         sll t7, v0, 3
         addu t7, t7, v0
         sll t7, t7, 3
         ori at, at, 0x88
         lui t9, %hi(data_table_935)
         addu v1, t6, t7
         addu v1, v1, at
         addiu t9, t9, %lo(data_table_935)
         sll t8, v0, 4
         addu a1, t8, t9
         sw v0, 0x0(v1)
         lwc1 ft0, 0x0(a1)
         addiu at, zero, 0x1
         swc1 ft0, 0x18(v1)
         lwc1 ft1, 0x4(a1)
         swc1 ft1, 0x1c(v1)
         lwc1 ft2, 0x8(a1)
         swc1 ft2, 0x20(v1)
         lwc1 ft3, 0xc(a1)
         swc1 ft3, 0x24(v1)
         lw t0, 0x10(a0)
         sw t0, 0x38(v1)
         lw t1, 0x14(a0)
         sw t1, 0x3c(v1)
         lw t2, 0x18(a0)
         sw t2, 0x40(v1)
         lw t3, 0x1c(a0)
         bne v0, at, .L9c39
         sw t3, 0x44(v1)
         lw t4, 0x10(a0)
         addiu at, zero, 0xe
         bne t4, at, .L9c39
         lui at, 0xc396
         mtc1 at, ft4
         nop 
         swc1 ft4, 0x18(v1)
     30jr ra
         nop 
```

## `aWeather_GetWeatherPrvNum`

```c
s32 aWeather_GetWeatherPrvNum(Actor* thisx) {
    Weather* this = (Weather*)thisx;
    WeatherPrv* priv = this->priv;

    s32 i;

    for (i = 0; i != 100; i++) {
        if (priv->use == 0) {
            return i;
        }
        priv++;
    }

    return -1;
}
```

```asm
         lw v0, 0x194(a0)
         addiu a0, zero, 0x64
         or v1, zero, zero
     27lbu t6, 0x2c(v0)
         bnezl t6, .L249
         lbu t7, 0x5c(v0)
         jr ra
         or v0, v1, zero
         lbu t7, 0x5c(v0)
     4addiu v0, v0, 0x30
         bnezl t7, .L3c15
         lbu t8, 0x5c(v0)
         jr ra
         addiu v0, v1, 0x1
         lbu t8, 0x5c(v0)
     10addiu v0, v0, 0x30
         bnezl t8, .L5421
         lbu t9, 0x5c(v0)
         jr ra
         addiu v0, v1, 0x2
         lbu t9, 0x5c(v0)
     16addiu v0, v0, 0x30
         bnezl t9, .L6c27
         addiu v1, v1, 0x4
         jr ra
         addiu v0, v1, 0x3
         addiu v1, v1, 0x4
     22bne v1, a0, .Lc3
         addiu v0, v0, 0x30
         addiu v0, zero, -0x1
         jr ra
         nop 
```

## `aWeather_CountWeatherPrivate`

```c
s32 aWeather_CountWeatherPrivate(Weather* this) {
    s32 i;
    s32 count;
    WeatherPrv* priv = this->priv;

    count = 0;

    for (i = 0; i < 100; i++, priv++) {
        if (priv->use != 0) {
            count++;
        }
    }

    return count;
}
```

```asm
         lw v0, 0x194(a0)
         or v1, zero, zero
         addiu a0, zero, 0x64
         or a1, zero, zero
     24lbu t6, 0x2c(v0)
         addiu a1, a1, 0x4
         beqzl t6, .L2810
         lbu t7, 0x5c(v0)
         addiu v1, v1, 0x1
         lbu t7, 0x5c(v0)
     6addiu v0, v0, 0x30
         beqzl t7, .L3c15
         lbu t8, 0x5c(v0)
         addiu v1, v1, 0x1
         lbu t8, 0x5c(v0)
     11addiu v0, v0, 0x30
         beqzl t8, .L5020
         lbu t9, 0x5c(v0)
         addiu v1, v1, 0x1
         lbu t9, 0x5c(v0)
     16addiu v0, v0, 0x30
         beqz t9, .L6024
         nop 
         addiu v1, v1, 0x1
     21bne a1, a0, .L104
         addiu v0, v0, 0x30
         or v0, v1, zero
         jr ra
         nop 
```









# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/player_actor/m_player/func_808BB604_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_808BB604_jp
nonmatching func_808BB604_jp, 0x4C
    /* 7B4CD4 808BB604 8C820CF0 */  lw          $v0, 0xCF0($a0)
    /* 7B4CD8 808BB608 24010066 */  addiu       $at, $zero, 0x66
    /* 7B4CDC 808BB60C 5441000E */  bnel        $v0, $at, .L808BB648
    /* 7B4CE0 808BB610 00001025 */   or         $v0, $zero, $zero
    /* 7B4CE4 808BB614 C4840028 */  lwc1        $ft0, 0x28($a0)
    /* 7B4CE8 808BB618 C4860D30 */  lwc1        $ft1, 0xD30($a0)
    /* 7B4CEC 808BB61C 46062200 */  add.s       $ft2, $ft0, $ft1
    /* 7B4CF0 808BB620 E4A80000 */  swc1        $ft2, 0x0($a1)
    /* 7B4CF4 808BB624 C4900D34 */  lwc1        $ft4, 0xD34($a0)
    /* 7B4CF8 808BB628 C48A002C */  lwc1        $ft3, 0x2C($a0)
    /* 7B4CFC 808BB62C 46105480 */  add.s       $ft5, $ft3, $ft4
    /* 7B4D00 808BB630 E4B20004 */  swc1        $ft5, 0x4($a1)
    /* 7B4D04 808BB634 C4860D38 */  lwc1        $ft1, 0xD38($a0)
    /* 7B4D08 808BB638 C4840030 */  lwc1        $ft0, 0x30($a0)
    /* 7B4D0C 808BB63C 46062200 */  add.s       $ft2, $ft0, $ft1
    /* 7B4D10 808BB640 E4A80008 */  swc1        $ft2, 0x8($a1)
    /* 7B4D14 808BB644 00001025 */  or          $v0, $zero, $zero
  .L808BB648:
    /* 7B4D18 808BB648 03E00008 */  jr          $ra
    /* 7B4D1C 808BB64C 00000000 */   nop
endlabel func_808BB604_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
