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
  name: z.string().min(2, "Укажите имя"),
  contact: z.string().min(3, "Укажите Telegram или WhatsApp"),
  service: z.string().min(1, "Выберите тип визы"),
  deadline: z.string().optional(),
  comment: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormProps {
  className?: string;
  defaultService?: string;
  compact?: boolean;
  embed?: boolean;
  variant?: "default" | "service";
  serviceName?: string;
}

export function LeadForm({
  className,
  defaultService,
  compact,
  embed,
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
      if (!res.ok) throw new Error(json.error ?? "Ошибка отправки");
      setStatus("success");
      reset({ service: initialService });
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Ошибка отправки");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center rounded-3xl border border-[var(--color-teal)]/25 bg-white px-8 py-12 text-center shadow-xl",
          compact && "rounded-2xl px-6 py-8 shadow-lg",
          embed && "border-[var(--color-border)] shadow-none",
          className,
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-teal)]/10">
          <CheckCircle2 className="text-[var(--color-teal)]" size={36} />
        </div>
        <p className="mt-5 font-display text-xl font-bold text-[var(--color-sapphire)]">
          Заявка принята
        </p>
        <p className="mt-2 max-w-xs text-sm font-medium text-[var(--color-muted)]">
          Ответим в Telegram или WhatsApp от 15 до 30 минут в рабочие часы.
        </p>
        <Button
          type="button"
          variant="link"
          className="mt-4 text-[var(--color-teal)]"
          onClick={() => setStatus("idle")}
        >
          Отправить ещё одну заявку
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
        compact && "rounded-2xl shadow-lg",
        embed && "rounded-2xl border-[var(--color-border)] shadow-none",
        className,
      )}
    >
      <div
        className={cn(
          "border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-sapphire)] to-[#1a3a5c] px-6 py-5 md:px-8",
          compact && "px-5 py-3.5 md:px-5",
        )}
      >
        <div className="flex items-center gap-2">
          <Sparkles size={compact ? 14 : 16} className="text-[var(--color-gold)]" />
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
            Бесплатно
          </p>
        </div>
        <p
          className={cn(
            "mt-1 font-display font-extrabold text-white",
            compact ? "text-base md:text-lg" : "text-xl md:text-2xl",
          )}
        >
          {isServicePage ? "Оставить заявку" : "Разбор вашего кейса"}
        </p>
        {!embed ? (
          <p className="mt-1 text-sm text-white/70">
            {isServicePage
              ? `${serviceName ?? "Услуга"}: бесплатный разбор документов и сроков, ответ от 15 до 30 минут`
              : "Ответ в мессенджере от 15 до 30 минут"}
          </p>
        ) : null}
      </div>

      <FieldGroup
        className={cn(
          "gap-4 p-6 pb-5 md:p-7 md:pb-5",
          compact && "gap-3 p-4 pb-4 md:p-4 md:pb-4",
        )}
      >
        <Field>
          <FieldLabel htmlFor="lead-name" className="font-semibold text-[var(--color-sapphire)]">
            Имя
          </FieldLabel>
          <Input
            id="lead-name"
            placeholder="Как к вам обращаться"
            autoComplete="name"
            className={cn(
              "rounded-xl border-[var(--color-border)] bg-[var(--color-bg)]/50 focus-visible:ring-[var(--color-gold)]",
              compact ? "h-11" : "h-12",
            )}
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
            Telegram или WhatsApp
          </FieldLabel>
          <Input
            id="lead-contact"
            placeholder="@username или номер"
            className={cn(
              "rounded-xl border-[var(--color-border)] bg-[var(--color-bg)]/50 focus-visible:ring-[var(--color-gold)]",
              compact ? "h-11" : "h-12",
            )}
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
            <FieldLabel
              id="lead-service-label"
              className="font-semibold text-[var(--color-sapphire)]"
            >
              Какая виза нужна
            </FieldLabel>
            <Select
              value={serviceValue || undefined}
              onValueChange={(v) => {
                if (v) setValue("service", v, { shouldValidate: true });
              }}
            >
              <SelectTrigger
                id="lead-service"
                aria-labelledby="lead-service-label"
                aria-label="Выберите услугу или консультацию"
                className={cn(
                  "w-full rounded-xl border-[var(--color-border)] bg-[var(--color-bg)]/50",
                  compact ? "h-11" : "h-12",
                )}
              >
                <SelectValue placeholder="Выберите услугу или консультацию" />
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
              Дополнительно: сроки и комментарий
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
                    Когда нужна виза
                  </FieldLabel>
                  <Input
                    id="lead-deadline"
                    placeholder="Например, через 2 недели"
                    className="h-12 rounded-xl"
                    {...register("deadline")}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="lead-comment">Комментарий</FieldLabel>
                  <Textarea
                    id="lead-comment"
                    rows={3}
                    placeholder="Кратко опишите ситуацию"
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
          label={isServicePage ? "Оставить заявку" : "Получить разбор кейса"}
        />

        <p className="text-center text-[11px] leading-snug text-[var(--color-muted)]">
          Нажимая кнопку, вы соглашаетесь на{" "}
          <a href="/privacy" className="underline hover:text-[var(--color-teal)]">
            обработку персональных данных
          </a>
        </p>
      </FieldGroup>
    </form>
  );
}
