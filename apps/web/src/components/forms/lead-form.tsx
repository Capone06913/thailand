"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { serviceOptions } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { RunawaySubmitButton } from "@/components/forms/runaway-submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

const leadSchema = z.object({
  name: z.string().min(2, "РЈРєР°Р¶РёС‚Рµ РёРјСЏ"),
  contact: z.string().min(3, "РЈРєР°Р¶РёС‚Рµ Telegram РёР»Рё WhatsApp"),
  service: z.string().min(1, "Р’С‹Р±РµСЂРёС‚Рµ С‚РёРї РІРёР·С‹"),
  deadline: z.string().optional(),
  comment: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormProps {
  className?: string;
  defaultService?: string;
  compact?: boolean;
  variant?: "default" | "service";
  serviceName?: string;
}

export function LeadForm({
  className,
  defaultService,
  compact,
  variant = "default",
  serviceName,
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [showExtra, setShowExtra] = useState(false);

  const initialService = defaultService ?? "";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { service: initialService },
  });

  const nameValue = watch("name");
  const contactValue = watch("contact");
  const serviceValue = watch("service");

  const isServicePage = variant === "service" && Boolean(defaultService);

  const isFormReady =
    (nameValue?.trim().length ?? 0) >= 2 &&
    (contactValue?.trim().length ?? 0) >= 3 &&
    (isServicePage || (Boolean(serviceValue) && serviceValue !== "unknown"));

  async function onSubmit(data: LeadFormData) {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "РћС€РёР±РєР° РѕС‚РїСЂР°РІРєРё");
      setStatus("success");
      reset({ service: initialService });
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "РћС€РёР±РєР° РѕС‚РїСЂР°РІРєРё");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center rounded-3xl border border-[var(--color-teal)]/25 bg-white px-8 py-12 text-center shadow-xl",
          className,
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-teal)]/10">
          <CheckCircle2 className="text-[var(--color-teal)]" size={36} />
        </div>
        <p className="mt-5 font-display text-xl font-bold text-[var(--color-sapphire)]">
          Р—Р°СЏРІРєР° РїСЂРёРЅСЏС‚Р°
        </p>
        <p className="mt-2 max-w-xs text-sm font-medium text-[var(--color-muted)]">
          РћС‚РІРµС‚РёРј РІ Telegram РёР»Рё WhatsApp РѕС‚ 15 РґРѕ 30 РјРёРЅСѓС‚ РІ СЂР°Р±РѕС‡РёРµ С‡Р°СЃС‹.
        </p>
        <Button
          type="button"
          variant="link"
          className="mt-4 text-[var(--color-teal)]"
          onClick={() => setStatus("idle")}
        >
          РћС‚РїСЂР°РІРёС‚СЊ РµС‰С‘ РѕРґРЅСѓ Р·Р°СЏРІРєСѓ
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "overflow-hidden rounded-3xl border bg-white shadow-2xl shadow-[var(--color-sapphire)]/8",
        isServicePage
          ? "border-[var(--color-gold)]/30 ring-1 ring-[var(--color-gold)]/20"
          : "border-[var(--color-border)]",
        compact && "shadow-lg",
        className,
      )}
    >
      <div className="border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-sapphire)] to-[#1a3a5c] px-6 py-5 md:px-8">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[var(--color-gold)]" />
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
            Р‘РµСЃРїР»Р°С‚РЅРѕ
          </p>
        </div>
        <p className="mt-1 font-display text-xl font-extrabold text-white md:text-2xl">
          {isServicePage ? "РћСЃС‚Р°РІРёС‚СЊ Р·Р°СЏРІРєСѓ" : "Р Р°Р·Р±РѕСЂ РІР°С€РµРіРѕ РєРµР№СЃР°"}
        </p>
        <p className="mt-1 text-sm text-white/70">
          {isServicePage
            ? `${serviceName ?? "РЈСЃР»СѓРіР°"}: Р±РµСЃРїР»Р°С‚РЅС‹Р№ СЂР°Р·Р±РѕСЂ РґРѕРєСѓРјРµРЅС‚РѕРІ Рё СЃСЂРѕРєРѕРІ, РѕС‚РІРµС‚ РѕС‚ 15 РґРѕ 30 РјРёРЅСѓС‚`
            : "РћС‚РІРµС‚ РІ РјРµСЃСЃРµРЅРґР¶РµСЂРµ РѕС‚ 15 РґРѕ 30 РјРёРЅСѓС‚"}
        </p>
      </div>

      <FieldGroup className="gap-4 p-6 pb-5 md:p-7 md:pb-5">
        <Field>
          <FieldLabel htmlFor="lead-name" className="font-semibold text-[var(--color-sapphire)]">
            РРјСЏ
          </FieldLabel>
          <Input
            id="lead-name"
            placeholder="РљР°Рє Рє РІР°Рј РѕР±СЂР°С‰Р°С‚СЊСЃСЏ"
            autoComplete="name"
            className="h-12 rounded-xl border-[var(--color-border)] bg-[var(--color-bg)]/50 focus-visible:ring-[var(--color-gold)]"
            {...register("name")}
          />
          {errors.name && (
            <FieldDescription className="text-destructive">
              {errors.name.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="lead-contact" className="font-semibold text-[var(--color-sapphire)]">
            Telegram РёР»Рё WhatsApp
          </FieldLabel>
          <Input
            id="lead-contact"
            placeholder="@username РёР»Рё РЅРѕРјРµСЂ"
            className="h-12 rounded-xl border-[var(--color-border)] bg-[var(--color-bg)]/50 focus-visible:ring-[var(--color-gold)]"
            {...register("contact")}
          />
          {errors.contact && (
            <FieldDescription className="text-destructive">
              {errors.contact.message}
            </FieldDescription>
          )}
        </Field>

        <input type="hidden" {...register("service")} />

        {!isServicePage ? (
          <Field>
            <FieldLabel className="font-semibold text-[var(--color-sapphire)]">
              РљР°РєР°СЏ РІРёР·Р° РЅСѓР¶РЅР°
            </FieldLabel>
            <Select
              value={serviceValue || undefined}
              onValueChange={(v) => {
                if (v) setValue("service", v, { shouldValidate: true });
              }}
            >
              <SelectTrigger className="h-12 w-full rounded-xl border-[var(--color-border)] bg-[var(--color-bg)]/50">
                <SelectValue placeholder="Р’С‹Р±РµСЂРёС‚Рµ СѓСЃР»СѓРіСѓ РёР»Рё РєРѕРЅСЃСѓР»СЊС‚Р°С†РёСЋ" />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && (
              <FieldDescription className="text-destructive">
                {errors.service.message}
              </FieldDescription>
            )}
          </Field>
        ) : null}

        {!compact && (
          <>
            <button
              type="button"
              onClick={() => setShowExtra((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)]/30 px-4 py-3 text-left text-sm font-semibold text-[var(--color-sapphire)] transition-colors hover:bg-[var(--color-bg)]"
            >
              Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅРѕ: СЃСЂРѕРєРё Рё РєРѕРјРјРµРЅС‚Р°СЂРёР№
              <ChevronDown
                size={18}
                className={cn(
                  "text-[var(--color-muted)] transition-transform",
                  showExtra && "rotate-180",
                )}
              />
            </button>

            {showExtra && (
              <>
                <Field>
                  <FieldLabel htmlFor="lead-deadline">
                    РљРѕРіРґР° РЅСѓР¶РЅР° РІРёР·Р°
                  </FieldLabel>
                  <Input
                    id="lead-deadline"
                    placeholder="РќР°РїСЂРёРјРµСЂ, С‡РµСЂРµР· 2 РЅРµРґРµР»Рё"
                    className="h-12 rounded-xl"
                    {...register("deadline")}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="lead-comment">РљРѕРјРјРµРЅС‚Р°СЂРёР№</FieldLabel>
                  <Textarea
                    id="lead-comment"
                    rows={3}
                    placeholder="РљСЂР°С‚РєРѕ РѕРїРёС€РёС‚Рµ СЃРёС‚СѓР°С†РёСЋ"
                    className="rounded-xl"
                    {...register("comment")}
                  />
                </Field>
              </>
            )}
          </>
        )}

        {status === "error" && (
          <p className="text-sm text-destructive">{errorMsg}</p>
        )}

        <RunawaySubmitButton
          ready={isFormReady}
          loading={status === "loading"}
          label={isServicePage ? "РћСЃС‚Р°РІРёС‚СЊ Р·Р°СЏРІРєСѓ" : "РџРѕР»СѓС‡РёС‚СЊ СЂР°Р·Р±РѕСЂ РєРµР№СЃР°"}
        />

        <p className="text-center text-xs text-[var(--color-muted)]">
          РќР°Р¶РёРјР°СЏ РєРЅРѕРїРєСѓ, РІС‹ СЃРѕРіР»Р°С€Р°РµС‚РµСЃСЊ РЅР°{" "}
          <a href="/privacy" className="underline hover:text-[var(--color-teal)]">
            РѕР±СЂР°Р±РѕС‚РєСѓ РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… РґР°РЅРЅС‹С…
          </a>
        </p>
      </FieldGroup>
    </form>
  );
}

